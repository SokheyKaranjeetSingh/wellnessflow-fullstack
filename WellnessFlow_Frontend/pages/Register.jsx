import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../services/axiosInstance';

function Register({ setToken }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/auth/register', { 
        email: formData.email, 
        password: formData.password 
      });
      const { token, userId, email: userEmail } = res.data;
      
      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', userEmail);
      
      setToken(token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-wellness-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-white">🌿</span>
          </div>
          <h2 className="text-3xl font-bold text-wellness-800">Join WellnessFlow</h2>
          <p className="mt-2 text-wellness-600">Create your account and start your wellness journey today</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-wellness-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-wellness-200 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-wellness-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-wellness-200 rounded-lg focus:ring-2 focus:ring-wellness-500 focus:border-transparent transition-colors"
              />
              <p className="text-xs text-wellness-500 mt-1">
                Use at least 8 characters with a mix of letters, numbers & symbols
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-wellness-500 hover:bg-wellness-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wellness-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-wellness-500 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-wellness-500 hover:text-wellness-600">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-wellness-500 hover:text-wellness-600">Privacy Policy</a>
            </p>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 pt-6 border-t border-wellness-200">
            <p className="text-center text-wellness-600">
              Already have an account?{' '}
              <Link to="/login" className="text-wellness-500 hover:text-wellness-700 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-wellness-500 hover:text-wellness-700 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
