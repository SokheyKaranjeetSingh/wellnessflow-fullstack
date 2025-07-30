import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/axiosInstance';

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch public sessions
    axios.get('/sessions')
      .then(res => setSessions(res.data))
      .catch(err => console.error('Failed to fetch sessions:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wellness-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-wellness-800 mb-2">
            Welcome back! 🌿
          </h1>
          <p className="text-wellness-600">
            Ready to continue your wellness journey? Explore sessions or create your own.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/my-sessions" className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-wellness-200 transition-colors">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-wellness-800 mb-2">My Sessions</h3>
            <p className="text-wellness-600">Manage your wellness sessions</p>
          </Link>

          <Link to="/editor" className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-wellness-200 transition-colors">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-wellness-800 mb-2">Create Session</h3>
            <p className="text-wellness-600">Design a new wellness experience</p>
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-wellness-800 mb-2">Your Progress</h3>
            <p className="text-wellness-600">{sessions.length} sessions explored</p>
          </div>
        </div>

        {/* Public Sessions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-wellness-800 mb-6">Discover Public Sessions</h2>
          
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-wellness-800 mb-2">No sessions yet</h3>
              <p className="text-wellness-600 mb-4">Be the first to create a wellness session!</p>
              <Link to="/editor" className="inline-flex items-center px-6 py-3 bg-wellness-500 text-white rounded-lg hover:bg-wellness-600 transition-colors">
                Create Your First Session
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map(session => (
                <div key={session.id} className="border border-wellness-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-wellness-800 mb-2">{session.title}</h3>
                  <p className="text-wellness-600 mb-4">{session.description || 'No description available'}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-wellness-500">By {session.user?.email || 'Anonymous'}</span>
                    <Link to={`/editor/${session.id}`} className="text-wellness-500 hover:text-wellness-700 font-medium">
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
