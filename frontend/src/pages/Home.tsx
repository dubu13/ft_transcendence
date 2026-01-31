import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Home.css';

export default function Home() {
  const auth = useContext(AuthContext) as any;
  const user = auth?.user;

  const GuestView = (
    <div className="home-guest">
      <h2>How to play</h2>
      <ol>
        <li>Use the arrow keys to move your paddle up and down.</li>
        <li>Score points by making the ball pass your opponent's paddle.</li>
        <li>First to reach the match score wins the match.</li>
      </ol>
      <p>
        To play tournaments, invite friends or use the social features you must create an account.
        Please <Link to="/register">register</Link> or <Link to="/login">login</Link> to access tournaments and friends.
      </p>
      <div className="home-actions">
        <Link to="/login" className="btn btn--primary">Login</Link>
        <Link to="/register" className="btn btn--ghost">Register</Link>
        <Link to="/game/guest" className="btn">Play as Guest</Link>
      </div>
    </div>
  );

  const UserView = (
    <div className="home-user">
      <h2>Tournament rules</h2>
      <ol>
        <li>Tournaments are time-limited and follow the bracket displayed on the tournament page.</li>
        <li>When your match is scheduled, join the match page to be queued and automatically paired.</li>
        <li>Respect the fair play rules: no cheating, no multi-accounting.</li>
      </ol>

      <h2>Game rules</h2>
      <ol>
        <li>Use the arrow keys to control your paddle.</li>
        <li>Matches can be ranked or casual; ranked matches affect your leaderboard rating.</li>
        <li>Disconnecting repeatedly may result in penalties.</li>
      </ol>

      <div className="home-actions">
        <Link to="/tournaments" className="btn btn--primary">Tournaments</Link>
        <Link to="/friends" className="btn">Friends</Link>
        <Link to="/game/ranked" className="btn btn--ghost">Play Ranked</Link>
        <Link to="/game/guest" className="btn">Play Casual</Link>
      </div>
    </div>
  );

  return (
    <section className="home page-home">
      <h1>Transcendence — Play Pong</h1>
      {user ? UserView : GuestView}
    </section>
  );
}