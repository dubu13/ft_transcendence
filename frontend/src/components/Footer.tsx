// import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <nav className="footer-links" aria-label="Footer links">
          <Link to="/terms">Terms</Link>
          <span className="sep">•</span>
          <Link to="/privacy">Privacy</Link>
        </nav>
        <small>© {new Date().getFullYear()} Transcendence</small>
      </div>
    </footer>
  );
}