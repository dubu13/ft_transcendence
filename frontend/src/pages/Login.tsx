import React, { useContext, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '', twofa: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await authService.login(form.email, form.password, form.twofa || undefined);

      // Hydrate context from /api/user/me
      try {
        const profile = await authService.me<Record<string, unknown>>();
        const normalized =
          (profile as any)?.user ??
          (profile as any)?.data ??
          profile;
        setUser?.(normalized as any);
      } catch {
        // ignore; still redirect
      }

      setMessage({ type: 'success', text: 'Login successful. Redirecting…' });
      navigate('/');
      return;
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message ?? 'Unexpected error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-login">
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required autoComplete="email" />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required autoComplete="current-password" />
            <input name="twofa" placeholder="2FA code (optional)" value={form.twofa} onChange={handleChange} autoComplete="one-time-code" />
            <button type="submit" disabled={loading}>
              {loading ? 'Contacting API…' : 'Login'}
            </button>
          </form>

          {message && <p className={`login-status ${message.type}`}>{message.text}</p>}

          <div className="login-actions">
            <button type="button" className="secondary" onClick={() => navigate('/')}>
              ← Back home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}