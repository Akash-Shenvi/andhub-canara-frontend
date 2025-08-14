import React, { useState, useEffect } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [API_BASE_URL, setApiBaseUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const response = await fetch('/base_data.json');
        const data = await response.json();
        setApiBaseUrl(data.API_BASE_URL);
      } catch (error) {
        console.error('Error loading API_BASE_URL:', error);
      }
    };

    fetchBaseUrl();
  }, []);

  const toggleMode = () => {
    setIsSignUp(prev => !prev);
    setError('');
    setShowOtpField(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.accesstoken);
        alert(`Welcome back, ${response.data._user_id}!`);
        navigate('/Dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.response || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (!showOtpField) {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/confirm-email`, { name, usn, email });
        if (response.status === 200) {
          setShowOtpField(true);
          alert('OTP sent to your email. Please verify.');
        }
      } catch (err) {
        setError(err.response?.data?.response || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, {
          name, usn, email, password, otp
        });
        if (response.status === 200) {
          alert('Registration successful! You can now sign in.');
          toggleMode();
        }
      } catch (err) {
        setError(err.response?.data?.response || 'Invalid OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <video id="background-video" autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- PC View (md and up) --- */}
      <div className="hidden md:block">
        <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
          <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
            {isSignUp ? (
              <form onSubmit={handleSignUp}>
                <h1 className="hh1">Create Account</h1>
                <span>Use your email for registration</span>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="USN" value={usn} onChange={(e) => setUsn(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {showOtpField && (
                  <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                )}
                <button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : showOtpField ? 'Verify OTP' : 'Sign Up'}
                </button>
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
              </form>
            ) : (
              <form onSubmit={handleSignIn}>
                <h1 className="hh1">Sign In</h1>
                <span>Use your email and password</span>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Link to="/forgotpass">Forgot Your Password?</Link>
                <button type="submit" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
              </form>
            )}
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className={`toggle-panel ${isSignUp ? 'toggle-left' : 'toggle-right'}`}>
                {isSignUp ? (
                  <>
                    <h1 className="hh1">Welcome Back!</h1>
                    <p>Enter your personal details to use all of the site features</p>
                    <button onClick={toggleMode}>Sign In</button>
                  </>
                ) : (
                  <>
                    <h1 className="hh1">Hello, Friend!</h1>
                    <p>Register with your personal details to use all of the site features</p>
                    <button onClick={toggleMode}>Sign Up</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile View (only below md) --- */}
      <div className="md:hidden min-h-screen flex items-center justify-center px-4 py-10 text-orange-400">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-3xl font-extrabold text-orange-400 mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>

          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {isSignUp && (
              <>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-700 text-orange border border-gray-600 focus:ring-2 focus:ring-orange-500" required />
                <input type="text" placeholder="USN" value={usn} onChange={(e) => setUsn(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-700 text-orange border border-gray-600 focus:ring-2 focus:ring-orange-500" required />
              </>
            )}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-700 text-orange border border-gray-600 focus:ring-2 focus:ring-orange-500" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-700 text-orange border border-gray-600 focus:ring-2 focus:ring-orange-500" required />
            {isSignUp && showOtpField && (
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-700 text-orange border border-gray-600 focus:ring-2 focus:ring-orange-500" required />
            )}

            {!isSignUp && (
              <div className="text-right text-sm text-blue-400 hover:underline">
                <Link to="/forgotpass">Forgot Password?</Link>
              </div>
            )}

            {error && <p className="text-sm text-red-400 text-center mt-2">{error}</p>}

            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition" disabled={loading}>
              {loading ? 'Processing...' : isSignUp ? (showOtpField ? 'Verify OTP' : 'Sign Up') : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-300">
            {isSignUp ? 'Already registered?' : "Don't have an account?"}
            <button onClick={toggleMode} className="text-blue-400 hover:underline font-semibold ml-1">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
