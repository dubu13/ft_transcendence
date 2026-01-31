import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Friends.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || window.location.origin;

interface User {
  id: number;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  wins: number;
  losses: number;
  online?: boolean;
}

interface Friend extends User {
  friendship_status?: 'accepted';
  last_seen?: string;
}

interface FriendRequest {
  id: number;
  from_user_id?: number;
  to_user_id?: number;
  from_user_display_name?: string;
  to_user_display_name?: string;
  avatar_url?: string;
  created_at?: string;
}

interface PendingRequests {
  incoming: FriendRequest[];
  outgoing: FriendRequest[];
}

const Friends: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [onlineFriends, setOnlineFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<PendingRequests>({ incoming: [], outgoing: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get auth token
  const getToken = () => {
    return localStorage.getItem('jwt') || localStorage.getItem('token');
  };

  // Fetch friends list
  const fetchFriends = async () => {
    try {
      const token = getToken();
      if (!token) {
        setError('Please log in to view friends');
        return;
      }

      const res = await fetch(`${API_BASE}/api/user/friends`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch friends');
      }

      const data = await res.json();
      setFriends(data.friends || []);
      setError(null);
    } catch (err: any) {
      console.error('Fetch friends error:', err);
      setError(err.message);
    }
  };

  // Fetch online friends
  const fetchOnlineFriends = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/user/friends/online`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        console.warn('Failed to fetch online friends');
        return;
      }

      const data = await res.json();
      setOnlineFriends(data.online_friends || []);
    } catch (err: any) {
      console.error('Fetch online friends error:', err);
    }
  };

  // Fetch friend requests
  const fetchRequests = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/user/friends/requests`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch requests');
      }

      const data = await res.json();
      setRequests({
        incoming: data.incoming || [],
        outgoing: data.outgoing || [],
      });
      setError(null);
    } catch (err: any) {
      console.error('Fetch requests error:', err);
      setError(err.message);
    }
  };

  // Search users
  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/user/search?q=${encodeURIComponent(query)}&limit=20`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Search failed');
      }

      const data = await res.json();
      const filteredUsers = (data.users || []).filter((u: User) => u.id !== user?.id);
      setSearchResults(filteredUsers);
      setError(null);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send friend request
  const sendRequest = async (friendId: number) => {
    try {
      const token = getToken();
      if (!token) {
        setError('Please log in to send friend requests');
        return;
      }

      const res = await fetch(`${API_BASE}/api/user/friends`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ friend_id: friendId }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send request');
      }

      alert('Friend request sent!');
      await fetchRequests();
      setError(null);
    } catch (err: any) {
      console.error('Send request error:', err);
      setError(err.message);
    }
  };

  // Accept request
  const respondToRequest = async (friendshipId: number, action: 'accept') => {
    try {
      const token = getToken();
      if (!token) {
        setError('Please log in');
        return;
      }

      const res = await fetch(`${API_BASE}/api/user/friends/${friendshipId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to respond');
      }

      alert(`Request ${action}ed!`);
      await fetchRequests();
      await fetchFriends();
      setError(null);
    } catch (err: any) {
      console.error('Respond to request error:', err);
      setError(err.message);
    }
  };

  // Cancel outgoing request
  const cancelRequest = async (friendId: number) => {
    try {
      const token = getToken();
      if (!token) {
        setError('Please log in');
        return;
      }

      const res = await fetch(`${API_BASE}/api/user/friends/${friendId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to cancel request');
      }

      alert('Request canceled!');
      await fetchRequests();
      setError(null);
    } catch (err: any) {
      console.error('Cancel request error:', err);
      setError(err.message);
    }
  };

  // Remove friend or reject request
  const removeFriendship = async (friendId: number) => {
    try {
      const token = getToken();
      if (!token) {
        setError('Please log in');
        return;
      }

      const res = await fetch(`${API_BASE}/api/user/friends/${friendId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to remove');
      }

      alert('Friendship removed!');
      await fetchFriends();
      await fetchRequests();
      setError(null);
    } catch (err: any) {
      console.error('Remove friendship error:', err);
      setError(err.message);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchFriends();
    fetchOnlineFriends();
    fetchRequests();

    const interval = setInterval(() => {
      fetchOnlineFriends();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Search with debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchQuery.trim()) {
        searchUsers(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  // Helper to get avatar URL with fallback
  const getAvatarUrl = (userId: number, avatarUrl?: string) => {
    if (avatarUrl && avatarUrl.startsWith('http')) {
      return avatarUrl;
    }
    return `${API_BASE}/api/user/${userId}/avatar`;
  };

  return (
    <div className="friends-page">
      <h1>Friends</h1>
      {error && <p className="error-message">{error}</p>}
      
      {/* Friend Requests Section */}
      <section className="friends-section">
        <h2>Friend Requests</h2>
        
        <div className="requests-subsection">
          <h3>Incoming</h3>
          {requests.incoming.length === 0 ? (
            <p className="empty-message">No incoming requests.</p>
          ) : (
            <div className="cards-grid">
              


              {requests.incoming.map((req) => (
                <div key={req.id} className="request-card">
                  <img 
                    src={getAvatarUrl(req.from_user_id || 0, req.avatar_url)} 
                    alt={`${req.from_user_display_name}'s avatar`}
                    className="card-avatar"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23333" width="50" height="50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20"%3E?%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="card-info">
                    <p className="card-name">{req.from_user_display_name || 'Unknown User'}</p>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="btn-accept" 
                      onClick={() => respondToRequest(req.id, 'accept')}
                    >
                      Accept
                    </button>
                    <button 
                      className="btn-reject" 
                     onClick={() => removeFriendship(req.from_user_id ?? req.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}



            </div>
          )}
        </div>

        <div className="requests-subsection">
          <h3>Outgoing</h3>
          {requests.outgoing.length === 0 ? (
            <p className="empty-message">No outgoing requests.</p>
          ) : (
            <div className="cards-grid">
              {requests.outgoing.map((req) => (
                <div key={req.id} className="request-card">
                  <img 
                    src={getAvatarUrl(req.to_user_id || 0, req.avatar_url)} 
                    alt={`${req.to_user_display_name}'s avatar`}
                    className="card-avatar"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23333" width="50" height="50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20"%3E?%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="card-info">
                    <p className="card-name">{req.to_user_display_name || 'Unknown User'}</p>
                    <p className="card-status pending">Pending</p>
                  </div>
                  <div className="card-actions">
                    {req.to_user_id && (
                      <button 
                        className="btn-cancel" 
                        onClick={() => cancelRequest(req.to_user_id!)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Friends List Section */}
      <section className="friends-section">
        <h2>My Friends</h2>
        {friends.length === 0 ? (
          <p className="empty-message">No friends yet. Search for users below to add friends!</p>
        ) : (
          <div className="cards-grid">
            {friends.map((friend) => {
              const isOnline = onlineFriends.some((online) => online.id === friend.id);
              return (
                <div key={friend.id} className="friend-card">
                  <img 
                    src={getAvatarUrl(friend.id, friend.avatar_url)} 
                    alt={`${friend.display_name}'s avatar`}
                    className="card-avatar"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23333" width="50" height="50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20"%3E' + friend.display_name.charAt(0).toUpperCase() + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="card-info">
                    <p className="card-name">{friend.display_name}</p>
                    <p className={`card-status ${isOnline ? 'online' : 'offline'}`}>
                      {isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="btn-remove" 
                      onClick={() => {
                        if (window.confirm(`Remove ${friend.display_name} from friends?`)) {
                          removeFriendship(friend.id);
                        }
                      }}
                    >
                      Remove Friend
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* User Search Section */}
      <section className="friends-section">
        <h2>Find Users</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        {loading && <p className="loading-message">Searching...</p>}
        {!loading && searchQuery.trim() && searchResults.length === 0 && (
          <p className="empty-message">No users found.</p>
        )}
        {searchResults.length > 0 && (
          <div className="cards-grid">
            {searchResults.map((searchUser) => {
              const isFriend = friends.some((f) => f.id === searchUser.id);
              const hasOutgoing = requests.outgoing.some((r) => r.to_user_id === searchUser.id);
              const hasIncoming = requests.incoming.some((r) => r.from_user_id === searchUser.id);
              
              return (
                <div key={searchUser.id} className="search-card">
                  <img 
                    src={getAvatarUrl(searchUser.id, searchUser.avatar_url)} 
                    alt={`${searchUser.display_name}'s avatar`}
                    className="card-avatar"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23333" width="50" height="50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20"%3E' + searchUser.display_name.charAt(0).toUpperCase() + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="card-info">
                    <p className="card-name">{searchUser.display_name}</p>
                    <p className="card-stats">W: {searchUser.wins} / L: {searchUser.losses}</p>
                  </div>
                  <div className="card-actions">
                    {isFriend ? (
                      <p className="already-friends">✓ Friends</p>
                    ) : hasOutgoing ? (
                      <p className="request-sent">Request Sent</p>
                    ) : hasIncoming ? (
                      <p className="request-sent">Pending Request</p>
                    ) : (
                      <button 
                        className="btn-add-friend" 
                        onClick={() => sendRequest(searchUser.id)}
                      >
                        Add Friend
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Friends;