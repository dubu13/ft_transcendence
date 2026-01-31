import React from 'react';

export default function Terms() {
  const containerStyle: React.CSSProperties = {
    padding: 24,
    maxWidth: 900,
    margin: '0 auto',
    minHeight: 'calc(100vh - var(--footer-height, 64px))',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 24,
  };
  const h1Style: React.CSSProperties = { marginBottom: 12 };
  const ulStyle: React.CSSProperties = { marginLeft: 18, marginTop: 8 };

  return (
    <main className="page-container terms-page" style={containerStyle}>
      <h1 style={h1Style}>Terms of Service</h1>
      <p>Welcome to Transcendence. By using this site you agree to follow the rules:</p>
      <ul style={ulStyle}>
        <li>Be respectful to other players.</li>
        <li>No cheating or exploiting bugs.</li>
        <li>Account sharing is prohibited.</li>
      </ul>
      <p>For tournament play and social features you must register and log in.</p>
    </main>
  );
}
// ...existing code...