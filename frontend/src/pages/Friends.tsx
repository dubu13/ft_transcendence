import React, { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext for user data
import { useContext } from 'react'; 

const API_BASE = import.meta.env.VITE_API_BASE_URL || window.location.origin;


interface User {
  id: number;
  display_name: string;
  avatar_url: string;
  bio?: string;
  wins: number;
  losses: number;
  online: boolean;
}

interface Friend extends User {
  friendship_status: 'accepted';
  last_seen?: string;
}

interface FriendRequest {
  id: number;
  from_user_id?: number;
  to_user_id?: number;
  from_user_display_name?: string;
  to_user_display_name?: string;
  avatar_url: string;
  created_at: string;
}

interface PendingRequests {
  incoming: FriendRequest[];
  outgoing: FriendRequest[];
}

const Friends: React.FC = () => {
//   const { user } = useContext(AuthContext); // Get current user
  const [friends, setFriends] = useState<Friend[]>([]);
  const [onlineFriends, setOnlineFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<PendingRequests>({ incoming: [], outgoing: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  // Fetch friends list
  console.log('API_BASE:', API_BASE);  // Debugging line]


  const fetchFriends = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/friends`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch friends');

      const data = await res.json();
      setFriends(data.friends || []);
    } catch (err: any) {
      setError(err.message);
    }
  };


  // Fetch online friends
  const fetchOnlineFriends = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/friends/online`, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      });
      if (!res.ok) throw new Error('Failed to fetch online friends');
      const data = await res.json();
      setOnlineFriends(data.online_friends || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Fetch friend requests
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/friends/requests`, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      });
      if (!res.ok) throw new Error('Failed to fetch requests');
      const data = await res.json();
      setRequests(data);
    } catch (err: any) {
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
      const res = await fetch(`${API_BASE}/api/user/search?q=${encodeURIComponent(query)}&limit=20`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      // Filter out the current user from results
      const filteredUsers = (data.users || []).filter((u: User) => u.id !== user?.id);
      setSearchResults(filteredUsers);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send friend request
  const sendRequest = async (friendId: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/friends`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ friend_id: friendId }),
      });
      if (!res.ok) throw new Error('Failed to send request');
      alert('Friend request sent!');
      fetchRequests(); // Refresh requests
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Accept/reject request
  const respondToRequest = async (friendshipId: number, action: 'accept') => {
    try {
      const res = await fetch(`${API_BASE}/api/user/friends/${friendshipId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error('Failed to respond');
      alert(`Request ${action}ed!`);
      fetchRequests();
      fetchFriends(); // Refresh friends if accepted
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Remove friend or cancel request
  const removeFriendship = async (friendId: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/friends/${friendId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      });
      if (!res.ok) throw new Error('Failed to remove');
      alert('Friendship removed!');
      fetchFriends();
      fetchRequests();
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchOnlineFriends();
    fetchRequests();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => searchUsers(searchQuery), 300);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <div className="friends-page" style={{ padding: 20 }}>
      <h1>Friends</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Friend Requests Section */}
      <section>
        <h2>Friend Requests</h2>
        <h3>Incoming</h3>
        {requests.incoming.length === 0 ? (
          <p>No incoming requests.</p>
        ) : (
          requests.incoming.map((req) => (
            <div key={req.id} style={{ border: '1px solid #ccc', padding: 10, margin: 5 }}>
              <img src={`${API_BASE}/api/user/${req.from_user_id}/avatar`} alt="Avatar" width={50} />
              <p>{req.from_user_display_name}</p>
              <button onClick={() => respondToRequest(req.id, 'accept')}>Accept</button>
              <button onClick={() => removeFriendship(req.id)}>Reject</button>
            </div>
          ))
        )}

        <h3>Outgoing</h3>
        {requests.outgoing.length === 0 ? (
          <p>No outgoing requests.</p>
        ) : (
          requests.outgoing.map((req) => (
            <div key={req.id} style={{ border: '1px solid #ccc', padding: 10, margin: 5 }}>
              <img src={`${API_BASE}/api/user/${req.to_user_id}/avatar`} alt="Avatar" width={50} />
              <p>{req.to_user_display_name} (Pending)</p>
              <button onClick={() => removeFriendship(req.id)}>Cancel</button>
            </div>
          ))
        )}
      </section>

      {/* Friends List Section */}
      <section>
        <h2>My Friends</h2>
        {friends.length === 0 ? (
          <p>No friends yet.</p>
        ) : (
          friends.map((friend) => {
            const isOnline = onlineFriends.some((online) => online.id === friend.id);
            return (
              <div key={friend.id} style={{ border: '1px solid #ccc', padding: 10, margin: 5 }}>
                <img src={`${API_BASE}/api/user/${friend.id}/avatar`} alt="Avatar" width={50} />
                <p>{friend.display_name}</p>
                <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
                <button onClick={() => removeFriendship(friend.id)}>Remove Friend</button>
              </div>
            );
          })
        )}
      </section>

      {/* User Search Section */}
      <section>
        <h2>Find Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading && <p>Loading...</p>}
        {searchResults.map((user) => {
          const isFriend = friends.some((f) => f.id === user.id);
          const hasOutgoing = requests.outgoing.some((r) => r.to_user_id === user.id);
          return (
            <div key={user.id} style={{ border: '1px solid #ccc', padding: 10, margin: 5 }}>
              <img src={`${API_BASE}/api/user/${user.id}/avatar`} alt="Avatar" width={50} />
              <p>{user.display_name}</p>
              <p>Wins: {user.wins}, Losses: {user.losses}</p>
              {isFriend ? (
                <p>Already friends</p>
              ) : hasOutgoing ? (
                <p>Request sent</p>
              ) : (
                <button onClick={() => sendRequest(user.id)}>Send Friend Request</button>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Friends;