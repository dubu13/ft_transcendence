import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Leaderboard from '../pages/Leaderboard';
import NotFound from '../pages/NotFound';
import Play from '../pages/Play';
import Tournament from '../pages/Tournament';
import Profile from '../pages/Profile';
import Friends from '../pages/Friends';
import ProtectedRoute from '../components/ProtectedRoute'; // added
import Terms from '../pages/Terms'; // added
import Privacy from '../pages/Privacy'; // added

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'leaderboard', element: <Leaderboard /> },
      { path: 'game/guest', element: <Play /> },
      { path: 'game/ranked', element: <Play /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'tournaments', element: (
          <ProtectedRoute><Tournament /></ProtectedRoute>
        )
      },
      { path: 'profile', element: (
          <ProtectedRoute><Profile /></ProtectedRoute>
        )
      },
      { path: 'friends', element: (
          <ProtectedRoute><Friends /></ProtectedRoute>
        )
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);