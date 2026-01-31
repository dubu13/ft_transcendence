import React from 'react';

export default function Privacy() {
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

  return (
    <main className="page-container privacy-page" style={containerStyle}>
      <h1 style={h1Style}>Privacy Policy</h1>
      <p>This site collects minimal data required for gameplay and social features.</p>
      <p>We store your display name, avatar and gameplay data. Tokens are kept client-side.</p>
      <p>Contact the team for data removal requests.</p>
    </main>
  );
}