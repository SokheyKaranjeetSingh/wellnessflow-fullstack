import React, { useState } from 'react';
import axios from '../services/axiosInstance';

function DebugPanel() {
  const [testResults, setTestResults] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const addResult = (test, status, message, data = null) => {
    setTestResults(prev => [...prev, { test, status, message, data, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testBackendConnectivity = async () => {
    setTestResults([]);
    addResult('Backend Test', 'info', 'Testing backend connectivity...');

    try {
      const response = await axios.get('/sessions');
      addResult('GET /sessions', 'success', 'Backend is reachable!', response.data);
    } catch (error) {
      addResult('GET /sessions', 'error', `Failed: ${error.message}`, error.response?.data);
    }
  };

  const testRegistration = async () => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;
    
    addResult('Registration Test', 'info', `Testing registration with ${testEmail}...`);

    try {
      const response = await axios.post('/auth/register', {
        email: testEmail,
        password: 'testpass123'
      });
      addResult('POST /auth/register', 'success', 'Registration successful!', response.data);
    } catch (error) {
      addResult('POST /auth/register', 'error', `Failed: ${error.message}`, error.response?.data);
    }
  };

  const testLogin = async () => {
    addResult('Login Test', 'info', 'Testing login with test@example.com...');

    try {
      const response = await axios.post('/auth/login', {
        email: 'test@example.com',
        password: 'password'
      });
      addResult('POST /auth/login', 'success', 'Login successful!', response.data);
    } catch (error) {
      addResult('POST /auth/login', 'error', `Failed: ${error.message}`, error.response?.data);
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      >
        🔧 Debug Panel
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Debug Panel</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={testBackendConnectivity}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Test Backend
        </button>
        <button
          onClick={testRegistration}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          Test Registration
        </button>
        <button
          onClick={testLogin}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
        >
          Test Login
        </button>
        <button
          onClick={() => setTestResults([])}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
        >
          Clear Results
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {testResults.map((result, index) => (
          <div key={index} className={`p-2 rounded text-xs ${
            result.status === 'success' ? 'bg-green-100 text-green-800' :
            result.status === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            <div className="font-medium">[{result.timestamp}] {result.test}</div>
            <div>{result.message}</div>
            {result.data && (
              <details className="mt-1">
                <summary className="cursor-pointer">View Data</summary>
                <pre className="text-xs mt-1 bg-gray-100 p-1 rounded overflow-x-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DebugPanel;
