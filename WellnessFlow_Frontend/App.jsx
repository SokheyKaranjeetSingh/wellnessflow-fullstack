import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import Navbar from './components/Navbar';
import DebugPanel from './components/DebugPanel';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!token ? <Register setToken={setToken} /> : <Navigate to="/dashboard" />} />
          <Route path="/*" element={
            <>
              <Navbar token={token} setToken={setToken} />
              <Routes>
                <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/my-sessions" element={token ? <MySessions /> : <Navigate to="/login" />} />
                <Route path="/editor/:id?" element={token ? <SessionEditor /> : <Navigate to="/login" />} />
                <Route path="*" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
              </Routes>
            </>
          } />
        </Routes>
        
        {/* Debug Panel - remove this in production */}
        <DebugPanel />
      </div>
    </Router>
  );
}

export default App;
