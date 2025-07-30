import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from '../services/axiosInstance';

function MySessions() {
  const [mySessions, setMySessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  const fetchSessions = () => {
    setLoading(true);
    setError(''); // Clear any previous errors
    setMySessions([]); // Clear previous data to ensure fresh fetch
    axios.get('/my-sessions')
      .then(res => {
        setMySessions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch sessions:', err);
        setError('Failed to fetch your sessions');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSessions();
  }, [location, location.state]); // Refetch when location changes or state changes

  // Also refresh when the component becomes visible again
  useEffect(() => {
    const handleFocus = () => {
      fetchSessions();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const deleteSession = async (id) => {
    if (!window.confirm('Are you sure you want to delete this session?')) return;
    
    try {
      await axios.delete(`/my-sessions/${id}`);
      setMySessions(mySessions.filter(s => s.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete session');
    }
  };

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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-wellness-800">My Sessions</h1>
            <p className="text-wellness-600 mt-2">Manage your wellness sessions and track your progress</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={fetchSessions}
              className="bg-wellness-200 hover:bg-wellness-300 text-wellness-700 px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <Link 
              to="/editor" 
              className="bg-wellness-500 hover:bg-wellness-600 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
            >
              <span className="mr-2">+</span>
              Create New Session
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {mySessions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-wellness-800 mb-4">No Sessions Yet</h2>
            <p className="text-wellness-600 mb-6 max-w-md mx-auto">
              Start your wellness journey by creating your first session. Share your knowledge and help others on their path to wellness.
            </p>
            <Link 
              to="/editor" 
              className="bg-wellness-500 hover:bg-wellness-600 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
            >
              <span className="mr-2">✨</span>
              Create Your First Session
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySessions.map(session => (
              <div key={session.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-wellness-800 mb-2">{session.title}</h3>
                    <p className="text-wellness-600 text-sm mb-3">{session.description || 'No description'}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link 
                      to={`/editor/${session.id}`}
                      className="text-wellness-500 hover:text-wellness-700 p-2 rounded-lg hover:bg-wellness-50 transition-colors"
                      title="Edit Session"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Session"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.status?.toLowerCase() === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.status?.toLowerCase() === 'published' ? '✓ Published' : '📝 Draft'}
                  </span>
                  <span className="text-xs text-wellness-500">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MySessions;
