import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axiosInstance';
import debounce from 'lodash.debounce';

function SessionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState({ 
    title: '', 
    description: '',
    tags: '', 
    jsonFileUrl: '', 
    status: 'draft' 
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOwnSession, setIsOwnSession] = useState(true); // Track if user owns this session

  const autoSave = debounce(async (sessionData) => {
    if (!sessionData.title.trim() || !id || !isOwnSession) return; // Only auto-save user's existing sessions
    
    try {
      setSaving(true);
      await axios.put(`/my-sessions/${id}`, {
        title: sessionData.title,
        description: sessionData.description,
        tags: sessionData.tags,
        jsonFileUrl: sessionData.jsonFileUrl
      });
      setSuccess('Auto-saved ✓');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      console.error('Auto-save failed:', err);
    } finally {
      setSaving(false);
    }
  }, 3000);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // First try to fetch from user's sessions
      axios.get('/my-sessions')
        .then(res => {
          const foundSession = res.data.find(s => s.id === parseInt(id));
          if (foundSession) {
            setSession(foundSession);
            setIsOwnSession(true);
            setLoading(false);
          } else {
            // If not found in user's sessions, try public sessions
            setIsOwnSession(false);
            return axios.get('/sessions');
          }
        })
        .then(res => {
          if (res && res.data) {
            const foundSession = res.data.find(s => s.id === parseInt(id));
            if (foundSession) {
              setSession(foundSession);
            } else {
              setError('Session not found or not accessible');
            }
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch session:', err);
          setError('Failed to load session');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...session, [name]: value };
    setSession(updated);
    setError('');
    
    // Only auto-save for existing sessions that belong to the user
    if (id && isOwnSession) {
      autoSave(updated);
    }
  };

  const handlePublish = async () => {
    if (!session.title.trim()) {
      setError('Please add a title before publishing');
      return;
    }

    try {
      setLoading(true);
      console.log('Publishing session. Current status:', session.status);
      
      if (id) {
        // Publish existing session
        await axios.post(`/my-sessions/publish?sessionId=${id}`);
        console.log('Publish API call successful');
        
        // Fetch the updated session to get the correct status from backend
        try {
          const updatedSessions = await axios.get('/my-sessions');
          const updatedSession = updatedSessions.data.find(s => s.id === parseInt(id));
          if (updatedSession) {
            setSession(updatedSession);
            console.log('Session updated with status:', updatedSession.status);
          } else {
            // Fallback to local update if not found
            setSession(prev => ({ ...prev, status: 'PUBLISHED' }));
          }
        } catch (fetchErr) {
          console.error('Failed to fetch updated session, using local update:', fetchErr);
          setSession(prev => ({ ...prev, status: 'PUBLISHED' }));
        }
      } else {
        // Create and publish new session
        const response = await axios.post('/my-sessions/save-draft', {
          title: session.title,
          description: session.description,
          tags: session.tags,
          jsonFileUrl: session.jsonFileUrl
        });
        await axios.post(`/my-sessions/publish?sessionId=${response.data.id}`);
        // Navigate to the published session
        navigate(`/editor/${response.data.id}`);
        return; // Exit early since we're navigating
      }
      
      setSuccess('Session published successfully! 🎉');
      // Force a refresh of MySessions by navigating with state
      setTimeout(() => navigate('/my-sessions', { state: { refresh: Date.now() } }), 2000);
    } catch (err) {
      console.error('Publish failed:', err);
      setError(err.response?.data?.message || 'Failed to publish session');
    } finally {
      setLoading(false);
    }
  };

    const handleSaveDraft = async () => {
    if (!session.title.trim()) {
      setError('Please add a title to save');
      return;
    }

    try {
      setLoading(true);
      let response;
      
      if (id) {
        // Update existing session
        response = await axios.put(`/my-sessions/${id}`, {
          title: session.title,
          description: session.description,
          tags: session.tags,
          jsonFileUrl: session.jsonFileUrl
        });
      } else {
        // Create new draft
        response = await axios.post('/my-sessions/save-draft', {
          title: session.title,
          description: session.description,
          tags: session.tags,
          jsonFileUrl: session.jsonFileUrl
        });
        // Navigate to editor with the new session ID
        navigate(`/editor/${response.data.id}`);
        return;
      }
      
      setSession(response.data);
      setSuccess('Draft saved successfully!');
    } catch (err) {
      console.error('Save draft failed:', err);
      setError(err.response?.data?.message || 'Failed to save draft');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wellness-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-wellness-800">
              {!isOwnSession ? 'View Session' : id ? 'Edit Session' : 'Create New Session'}
            </h1>
            <p className="text-wellness-600 mt-2">
              {!isOwnSession ? 'Viewing a published wellness session' : 
               id ? 'Update your wellness session' : 'Share your wellness knowledge with the community'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {saving && (
              <span className="text-wellness-600 text-sm flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-wellness-500 mr-2"></div>
                Saving...
              </span>
            )}
            {success && (
              <span className="text-green-600 text-sm">{success}</span>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-wellness-700 mb-2">
                Session Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter a compelling title for your session"
                value={session.title}
                onChange={handleChange}
                required
                readOnly={!isOwnSession}
                className={`w-full px-4 py-3 border border-wellness-200 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-transparent transition-colors ${!isOwnSession ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-wellness-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe what participants will learn or experience..."
                value={session.description}
                onChange={handleChange}
                readOnly={!isOwnSession}
                className={`w-full px-4 py-3 border border-wellness-200 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-transparent transition-colors ${!isOwnSession ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-wellness-700 mb-2">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="mindfulness, meditation, stress-relief (comma-separated)"
                value={session.tags}
                onChange={handleChange}
                readOnly={!isOwnSession}
                className={`w-full px-4 py-3 border border-wellness-200 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-transparent transition-colors ${!isOwnSession ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
              <p className="text-sm text-wellness-500 mt-1">
                Add relevant tags to help others discover your session
              </p>
            </div>

            {/* JSON File URL */}
            <div>
              <label htmlFor="jsonFileUrl" className="block text-sm font-medium text-wellness-700 mb-2">
                Session Data URL
              </label>
              <input
                id="jsonFileUrl"
                name="jsonFileUrl"
                type="url"
                placeholder="https://example.com/session-data.json"
                value={session.jsonFileUrl}
                onChange={handleChange}
                readOnly={!isOwnSession}
                className={`w-full px-4 py-3 border border-wellness-200 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-transparent transition-colors ${!isOwnSession ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
              <p className="text-sm text-wellness-500 mt-1">
                URL to your session configuration file (JSON format)
              </p>
            </div>

            {/* Status Display */}
            <div>
              <label className="block text-sm font-medium text-wellness-700 mb-2">
                Current Status
              </label>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                session.status?.toLowerCase() === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {session.status?.toLowerCase() === 'published' ? '✓ Published' : '📝 Draft'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-wellness-200">
            <button
              onClick={() => navigate(isOwnSession ? '/my-sessions' : '/dashboard')}
              className="px-6 py-3 border border-wellness-300 text-wellness-700 rounded-lg hover:bg-wellness-50 transition-colors"
            >
              ← Back to {isOwnSession ? 'My Sessions' : 'Dashboard'}
            </button>

            {isOwnSession && (
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveDraft}
                  disabled={loading}
                  className="px-6 py-3 bg-wellness-100 text-wellness-700 rounded-lg hover:bg-wellness-200 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Saving...' : 'Save Draft'}
                </button>

                <button
                  onClick={handlePublish}
                  disabled={loading || !session.title.trim()}
                  className="px-6 py-3 bg-wellness-500 text-white rounded-lg hover:bg-wellness-600 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Publishing...' : 'Publish Session'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionEditor;
