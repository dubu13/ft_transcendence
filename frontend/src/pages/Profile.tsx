import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';
import '../styles/Profile.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || window.location.origin;



const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, refresh } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [twoFAEnabled, setTwoFAEnabled] = useState<boolean | null>(null);
  const [twoFASetupData, setTwoFASetupData] = useState<{ qrCode: string; secret: string } | null>(null);
  const [twoFACode, setTwoFACode] = useState('');
  const [twoFASaving, setTwoFASaving] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setDisplayName((user.display_name as string) || '');
      setEmail((user.email as string) || '');
      setBio((user.bio as string) || '');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      authService.get2FAStatus()
        .then((res) => setTwoFAEnabled(!!res.twofa_enabled))
        .catch(() => setTwoFAEnabled(false));
    }
  }, [user]);

  const currentAvatarUrl = (() => {
    if (!user?.id) return null;
    // Add cache-busting timestamp to force reload after upload
    const timestamp = Date.now();
    return `${API_BASE}/api/user/${user.id}/avatar?t=${timestamp}`;
  })();

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // ✅ Validate file type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Only JPEG and PNG images are allowed.' });
      return;
    }
    // ✅ Validate file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setMessage({ type: 'error', text: 'Image must be smaller than 2MB.' });
      return;
    }
    
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    setMessage(null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await authService.updateProfile({
        display_name: displayName,
        bio,
      });
      await refresh();
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message ?? 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };


  const handleUploadAvatar = async () => {
    if (!avatarFile) return;
    setAvatarSaving(true);
    setMessage(null);
    try {
      const res = await authService.uploadAvatar(avatarFile);
      console.log('Upload success:', res);
      setMessage({ type: 'success', text: 'Avatar uploaded successfully.' });
      setAvatarFile(null);
      setAvatarPreview(null);
      
      // Refresh user context instead of full page reload
      await refresh();
      setAvatarSaving(false);
    } catch (err: any) {
      console.error('Avatar upload error:', err);
      setMessage({ type: 'error', text: err?.message ?? 'Failed to upload avatar.' });
      setAvatarSaving(false);
    }
  };

  const handleSetup2FA = async () => {
    setTwoFASaving(true);
    setMessage(null);
    try {
      const data = await authService.setup2FA();
      setTwoFASetupData(data);
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message ?? 'Failed to setup 2FA.' });
    } finally {
      setTwoFASaving(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!twoFACode.trim()) return;
    setTwoFASaving(true);
    setMessage(null);
    try {
      await authService.verify2FA(twoFACode);
      setTwoFAEnabled(true);
      setTwoFASetupData(null);
      setTwoFACode('');
      setMessage({ type: 'success', text: '2FA enabled successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message ?? 'Invalid 2FA code.' });
    } finally {
      setTwoFASaving(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="page-profile">
        <div className="profile-loading">Loading profile…</div>
      </div>
    );
  }

  if (!user) {
    return null; // redirect effect will handle navigation
  }

  const wins = (user.wins as number) || 0;
  const losses = (user.losses as number) || 0;
  const total = wins + losses;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <div className="page-profile">
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-title">Your Profile</h1>
          <p className="profile-subtitle">Manage your avatar, info, and view your stats.</p>
          <div className="profile-grid">
            {/* Left column: Avatar */}
            <section className="profile-avatar-section">
              <h2>Avatar</h2>
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-circle">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar preview" />
                  ) : currentAvatarUrl ? (
                    <img src={currentAvatarUrl} alt="Current avatar" />
                  ) : (
                    <div className="profile-avatar-fallback">
                      {(user.display_name || user.email || 'U')
                        .toString()
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <label className="profile-file-label">
                  <span>Choose new avatar</span>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </label>
                {avatarFile && (
                  <button
                    type="button"
                    className="profile-avatar-save"
                    onClick={handleUploadAvatar}
                    disabled={avatarSaving}
                  >
                    {avatarSaving ? 'Uploading…' : 'Save avatar'}
                  </button>
                )}
              </div>
              {/* Stats section */}
              <div className="profile-stats">
                <h2>Game Stats</h2>
                <div className="profile-stat-grid">
                  <div className="profile-stat-item">
                    <div className="profile-stat-value">{wins}</div>
                    <div className="profile-stat-label">Wins</div>
                  </div>
                  <div className="profile-stat-item">
                    <div className="profile-stat-value">{losses}</div>
                    <div className="profile-stat-label">Losses</div>
                  </div>
                  <div className="profile-stat-item">
                    <div className="profile-stat-value">{winRate}%</div>
                    <div className="profile-stat-label">Win Rate</div>
                  </div>
                </div>
              </div>
            </section>
            {/* Right column: Info form */}
            <section className="profile-info-section">
              <h2>Profile Info</h2>
              <form className="profile-form" onSubmit={handleSaveProfile}>
                <div className="profile-field">
                  <label htmlFor="display_name">Display name</label>
                  <input
                    id="display_name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    autoComplete="nickname"
                  />
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <p style={{ margin: 0, padding: '8px 0', color: '#666' }}>{email}</p>
                </div>
                <div className="profile-field">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself…"
                  />
                </div>
                <button type="submit" disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </form>
            </section>
          </div>
          {/* Two-Factor Authentication Section */}
          <section className="profile-2fa-section" style={{ marginTop: 32, padding: '20px', border: '1px solid #ddd', borderRadius: 8 }}>
            <h2 style={{ marginTop: 0 }}>Two-Factor Authentication</h2>
            {twoFAEnabled === null ? (
              <p>Loading 2FA status...</p>
            ) : twoFAEnabled ? (
              <p style={{ color: 'green' }}>2FA is enabled on your account.</p>
            ) : twoFASetupData ? (
              <div>
                <p>Scan this QR code with your authenticator app:</p>
                <img src={twoFASetupData.qrCode} alt="2FA QR Code" style={{ display: 'block', margin: '16px 0' }} />
                <p style={{ fontSize: '0.9em', color: '#666' }}>
                  Or enter this secret manually: <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>{twoFASetupData.secret}</code>
                </p>
                <div style={{ marginTop: 16 }}>
                  <label htmlFor="twofa_code" style={{ display: 'block', marginBottom: 8 }}>Enter verification code:</label>
                  <input
                    id="twofa_code"
                    type="text"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    style={{ padding: '8px 12px', fontSize: '1em', marginRight: 8 }}
                  />
                  <button
                    type="button"
                    onClick={handleVerify2FA}
                    disabled={twoFASaving || !twoFACode.trim()}
                    style={{ padding: '8px 16px' }}
                  >
                    {twoFASaving ? 'Verifying...' : 'Verify & Enable 2FA'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>Add an extra layer of security to your account by enabling two-factor authentication.</p>
                <button
                  type="button"
                  onClick={handleSetup2FA}
                  disabled={twoFASaving}
                  style={{ padding: '10px 18px' }}
                >
                  {twoFASaving ? 'Setting up...' : 'Setup 2FA'}
                </button>
              </div>
            )}
          </section>
          <button
            className="profile-delete-btn"
            style={{ marginTop: 32, background: '#c00', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, cursor: 'pointer' }}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete account
          </button>
          {/* Confirm Delete Modal */}
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Confirm Account Deletion</h3>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button
                    className="btn"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={deleting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn--danger"
                    style={{ background: '#c00', color: '#fff' }}
                    onClick={async () => {
                      setDeleting(true);
                      setDeleteError(null);
                      try {
                        await authService.deleteAccount();
                        localStorage.removeItem('jwt');
                        setShowDeleteModal(false);
                        navigate('/login');
                      } catch (e: any) {
                        setDeleteError(e.message || 'Delete failed');
                        setDeleting(false);
                      }
                    }}
                    disabled={deleting}
                  >
                    {deleting ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}
          {message && <p className={`profile-status ${message.type}`}>{message.text}</p>}
        </div>
      </div>
    </div>
  );
};


export default Profile;