import React from 'react';

export default function Terms() {
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

  const titleStyle: React.CSSProperties = {
    fontSize: '2.25rem',
    fontWeight: 700,
    marginBottom: 12,
    textAlign: 'center',
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 24,
    border: '1px solid rgba(255,255,255,0.06)',
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

  const textStyle: React.CSSProperties = {
    color: 'var(--muted, #9aa3b2)',
    marginBottom: 12,
    lineHeight: 1.6,
  };

  const listStyle: React.CSSProperties = {
    marginLeft: 20,
    color: 'var(--muted, #9aa3b2)',
  };

  return (
    <main style={pageStyle}>
      <header>
        <h1 style={titleStyle}>Terms of Service</h1>
        <p style={{ color: 'var(--muted, #9aa3b2)', textAlign: 'center' }}>
          <strong style={{ color: 'var(--primary-foreground, #eae9f9)' }}>Effective Date:</strong> Febuary 1, 2026
        </p>
      </header>

      <div style={cardStyle}>
        <section style={{ marginBottom: 20 }}>
          <p style={textStyle}>
            Welcome to Pong Arena. By creating an account and using our multiplayer Pong game platform, you agree to these Terms of Service. Please read them carefully before using our services.
          </p>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>✅</span> 1. Acceptance of Terms</h2>
          <p style={textStyle}>
            By accessing or using Pong Arena, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>👤</span> 2. Account Registration</h2>
          <p style={textStyle}>To use Pong Arena, you must create an account. You agree to:</p>
          <ul style={listStyle}>
            <li><strong>Provide accurate information:</strong> Your email and display name must be valid and truthful</li>
            <li><strong>Keep your password secure:</strong> You are responsible for all activity under your account</li>
            <li><strong>Maintain one account:</strong> Multiple accounts per person are prohibited</li>
            <li><strong>Keep credentials private:</strong> Do not share your account with others</li>
            <li><strong>Update information:</strong> Keep your profile information current and accurate</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>⚖️</span> 3. User Conduct</h2>
          <p style={textStyle}>You agree to follow fair play guidelines and community standards. You must NOT:</p>
          <ul style={listStyle}>
            <li><strong>Cheat or exploit:</strong> Use bugs, hacks, bots, or any unfair advantages during gameplay</li>
            <li><strong>Harass others:</strong> Engage in abusive, threatening, or discriminatory behavior toward other players</li>
            <li><strong>Use offensive content:</strong> Display inappropriate usernames, avatars</li>
            <li><strong>Disrupt service:</strong> Attempt to hack, DDoS, or otherwise interfere with the platform</li>
            <li><strong>Share inappropriate content:</strong> Post or transmit harmful, illegal, or offensive material</li>
          </ul>
          <div style={{ marginTop: 12, padding: 12, background: 'rgba(185,28,28,0.06)', border: '1px solid rgba(185,28,28,0.12)', borderRadius: 6 }}>
            <p style={{ margin: 0, color: 'var(--muted, #9aa3b2)' }}>
              <strong>⚠️ Warning:</strong> Violations of these conduct rules may result in immediate account suspension or permanent ban.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🎮</span> 4. Gameplay and Matches</h2>
          <p style={textStyle}>When participating in matches and tournaments:</p>
          <ul style={listStyle}>
            <li><strong>Match results are final:</strong> Once a match is recorded, the result cannot be changed</li>
            <li><strong>Disconnections:</strong> Intentional disconnections or rage-quits may result in automatic forfeiture</li>
            <li><strong>Leaderboard:</strong> Your rating is calculated based on match outcomes</li>
            <li><strong>Suspicious activity:</strong> We reserve the right to investigate and invalidate matches that appear fraudulent</li>
            <li><strong>Tournament rules:</strong> Specific tournaments may have additional rules and requirements</li>
            <li><strong>Matchmaking:</strong> Our AI matchmaking system pairs you with opponents</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🏆</span> 5. Tournaments</h2>
          <p style={textStyle}>Tournament participation requires adherence to additional guidelines:</p>
          <ul style={listStyle}>
            <li><strong>Commitment:</strong> You must be available for all scheduled tournament matches</li>
            <li><strong>Brackets:</strong> Tournament brackets are generated automatically and cannot be manually adjusted</li>
            <li><strong>No-shows:</strong> Failing to appear for a match results in automatic disqualification</li>
            <li><strong>Fair play:</strong> Collusion, match-fixing, or any form of cheating is strictly prohibited</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🚫</span> 6. Account Suspension and Termination</h2>
          <p style={textStyle}>We may suspend or permanently terminate your account if you:</p>
          <ul style={listStyle}>
            <li>Violate any provision of these Terms of Service</li>
            <li>Engage in cheating, hacking, or other unfair gameplay practices</li>
            <li>Harass, threaten, or abuse other users</li>
            <li>Create multiple accounts to manipulate rankings or matchmaking</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🔒</span> 7. Privacy and Data Collection</h2>
          <p style={textStyle}>
            We collect and store information necessary to operate the platform. This includes account data, game statistics, social connections, and tournament records.
          </p>
          <div style={{ marginTop: 12, padding: 12, background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.08)', borderRadius: 6 }}>
            <p style={{ margin: 0, color: 'var(--muted, #9aa3b2)' }}>
              For more details about how we handle your data, please review our <a href="/privacy" style={{ color: 'var(--primary-foreground, #eae9f9)' }}>Privacy Policy</a>.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>🌐</span> 8. Service Availability</h2>
          <p style={textStyle}>We strive to provide a reliable gaming experience, but:</p>
          <ul style={listStyle}>
            <li><strong>No guarantees:</strong> We do not guarantee uninterrupted or error-free service</li>
            <li><strong>Maintenance:</strong> Scheduled or emergency maintenance may cause temporary downtime</li>
            <li><strong>Feature changes:</strong> We may modify, add, or remove features at any time</li>
            <li><strong>Service discontinuation:</strong> We reserve the right to discontinue the service with reasonable notice</li>
            <li><strong>Updates:</strong> Game balance changes, new features, or bug fixes may be deployed without prior notice</li>
          </ul>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={sectionHeadingStyle}><span>⚠️</span> 9. Limitation of Liability</h2>
          <p style={textStyle}>
            Pong Arena is provided "as is" without warranties of any kind. We are not liable for losses, data loss, user interactions, damages, or third-party service issues.
          </p>
          <p style={{ color: 'var(--muted, #9aa3b2)', marginTop: 8, fontStyle: 'italic' }}>
            You use Pong Arena at your own risk. We are not responsible for any losses or damages resulting from your use of the service.
          </p>
        </section>

        <section style={{ marginBottom: 0 }}>
          <h2 style={sectionHeadingStyle}><span>🔄</span> 10. Changes to Terms</h2>
          <p style={textStyle}>
            We may update these Terms of Service at any time to reflect changes in practices, legal requirements, or community feedback. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'var(--muted, #9aa3b2)', fontSize: 16 }}>
            <strong>By using Pong Arena, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
          </p>
          <p style={{ marginTop: 8, color: 'var(--muted, #9aa3b2)', fontSize: 13 }}>
            Thank you for being part of our community.
          </p>
        </div>
      </div>
    </main>
  );
}