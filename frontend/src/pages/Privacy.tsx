import React from 'react';

export default function Privacy() {
  const pageStyle: React.CSSProperties = {
    padding: 24,
    maxWidth: 1024,
    margin: '0 auto',
    minHeight: 'calc(100vh - var(--footer-height, 64px))',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    paddingBottom: 24,
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.25rem',
    fontWeight: 700,
    marginBottom: 12,
    lineHeight: 1.1,
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 24,
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'var(--primary-foreground, #eae9f9)',
  };

  const textStyle: React.CSSProperties = { color: 'var(--muted, #9aa3b2)', marginBottom: 12, lineHeight: 1.6 };
  const listStyle: React.CSSProperties = { marginLeft: 20, color: 'var(--muted, #9aa3b2)' };
  const noteBoxStyle: React.CSSProperties = {
    marginTop: 12,
    padding: 12,
    background: 'rgba(75,85,99,0.06)',
    border: '1px solid rgba(75,85,99,0.12)',
    borderRadius: 6,
  };

  return (
    <main style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Privacy Policy</h1>
        <p style={{ color: 'var(--muted, #9aa3b2)', marginTop: 8 }}>
          <strong style={{ color: 'var(--primary-foreground, #eae9f9)' }}>Last Updated:</strong> January 7, 2026
        </p>
      </header>

      <div style={cardStyle}>
        <section style={{ marginBottom: 20 }}>
          <p style={textStyle}>
            Welcome to Pong Arena. We respect your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our web-based Pong game.
          </p>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>📋</span> 1. Information We Collect</h2>
          <p style={textStyle}>We collect the following types of information:</p>
          <ul style={listStyle}>
            <li><strong>Email Address:</strong> Used for account creation and authentication</li>
            <li><strong>Display Name:</strong> Your chosen username visible to other players</li>
            <li><strong>Avatar:</strong> Profile picture you upload (optional)</li>
            <li><strong>Game Statistics:</strong> Match history, wins, losses, and Elo ratings</li>
            <li><strong>Friends List:</strong> Connections with other players</li>
            <li><strong>Tournament Data:</strong> Participation and results in tournaments</li>
            <li><strong>Chat Messages:</strong> In-game communications with other players</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🎯</span> 2. How We Use Your Information</h2>
          <p style={textStyle}>We use your information for the following purposes:</p>
          <ul style={listStyle}>
            <li><strong>Authentication:</strong> To verify your identity and secure your account</li>
            <li><strong>Game Features:</strong> To enable matchmaking, track game progress, and manage tournaments</li>
            <li><strong>Leaderboards:</strong> To display rankings and competitive standings</li>
            <li><strong>Social Features:</strong> To facilitate friend connections and chat functionality</li>
            <li><strong>Service Improvement:</strong> To analyze gameplay patterns and enhance user experience</li>
            <li><strong>AI Matchmaking:</strong> To pair you with appropriate opponents based on skill level</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🔒</span> 3. Data Storage and Security</h2>
          <p style={textStyle}>
            Your data is stored securely in <strong>SQLite databases</strong> on our servers across three main services:
          </p>
          <ul style={listStyle}>
            <li><strong>Authentication Service:</strong> Stores encrypted credentials and session tokens</li>
            <li><strong>User Service:</strong> Manages profiles, avatars, and friend relationships</li>
            <li><strong>Pong Service:</strong> Stores match history, Elo ratings, and tournament data</li>
          </ul>

          <p style={{ ...textStyle, marginTop: 8, fontWeight: 600 }}>We implement the following security measures:</p>
          <ul style={listStyle}>
            <li>Encrypted password storage using industry-standard hashing algorithms</li>
            <li>Secure JWT authentication tokens for session management</li>
            <li>Protected API endpoints with authentication middleware</li>
            <li>Rate limiting to prevent abuse</li>
            <li>Regular security updates and monitoring</li>
            <li>Data backups to prevent loss</li>
          </ul>

          <p style={{ color: 'var(--muted, #9aa3b2)', marginTop: 8, fontStyle: 'italic' }}>
            While we take reasonable measures to protect your information, no internet transmission is completely secure.
            You use our service at your own risk.
          </p>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🤝</span> 4. Data Sharing</h2>
          <p style={textStyle}>
            We do <strong>not sell, trade, or rent</strong> your personal information to third parties. Your data is only shared in the following limited circumstances:
          </p>
          <ul style={listStyle}>
            <li><strong>Public Information:</strong> Display names, avatars, and game statistics are visible to other players</li>
            <li><strong>Leaderboards:</strong> Rankings and match history are publicly displayed</li>
            <li><strong>Tournament Brackets:</strong> Participation in tournaments is visible to all participants</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>✅</span> 5. Your Rights</h2>
          <p style={textStyle}>You have the following rights regarding your personal data:</p>
          <ul style={listStyle}>
            <li><strong>Access:</strong> View your profile and game statistics at any time</li>
            <li><strong>Update:</strong> Modify your display name, avatar, and other profile information</li>
            <li><strong>Delete Account:</strong> Permanently remove your account and associated data from all services</li>
            <li><strong>Data Portability:</strong> Request a copy of your personal data</li>
            <li><strong>Withdraw Consent:</strong> Stop using the service and delete your account at any time</li>
            <li><strong>Object to Processing:</strong> Opt out of certain data processing activities</li>
          </ul>

          <div style={noteBoxStyle}>
            <p style={{ margin: 0, color: 'var(--muted, #9aa3b2)' }}>
              <strong>To exercise these rights:</strong> Visit your profile settings or contact us directly. Account deletion will remove all your personal data within 30 days.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🍪</span> 6. Cookies and Local Storage</h2>
          <p style={textStyle}>
            We use <strong>local storage</strong> and <strong>session tokens</strong> to maintain your login state and preferences.
            These are essential for the functionality of the game and cannot be disabled while using the service. We do not use
            third-party tracking cookies or analytics.
          </p>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>⏰</span> 7. Data Retention</h2>
          <p style={textStyle}>
            We retain your personal information for as long as your account is active or as needed to provide services.
            When you delete your account:
          </p>
          <ul style={listStyle}>
            <li>Personal data is removed within <strong>30 days</strong></li>
            <li>Game statistics may be anonymized and retained for historical leaderboard purposes</li>
            <li>We retain data longer only when required by law</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🔄</span> 8. Changes to This Policy</h2>
          <p style={textStyle}>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
            We will notify you of any material changes by:
          </p>
          <ul style={listStyle}>
            <li>Posting the new Privacy Policy on this page</li>
            <li>Updating the "Last Updated" date</li>
            <li>Displaying a notification in-game (for significant changes)</li>
          </ul>
          <p style={textStyle}>Continued use of the service after changes constitutes acceptance of the updated policy.</p>
        </section>

        <section style={{ marginBottom: 0 }}>
          <h2 style={sectionHeadingStyle}><span>📧</span> 9. Contact Us</h2>
          <p style={textStyle}>
            If you have questions about this Privacy Policy, wish to exercise your rights, or have privacy concerns:
          </p>
          <ul style={listStyle}>
            <li>Access your profile settings within the application</li>
            <li>Use the support/contact section in your user dashboard</li>
            <li>Submit a privacy-related request through our support system</li>
          </ul>
        </section>

        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'var(--muted, #9aa3b2)', fontSize: 16 }}>
            ⚡ <strong>By using Pong Arena, you acknowledge that you have read and understood this Privacy Policy.</strong>
          </p>
          <p style={{ marginTop: 8, color: 'var(--muted, #9aa3b2)', fontSize: 13 }}>
            Thank you for trusting us with your information. We're committed to protecting your privacy while delivering an amazing gaming experience.
          </p>
        </div>
      </div>
    </main>
  );
}