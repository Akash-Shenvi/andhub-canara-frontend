import { useEffect, useState } from 'react';
import axios from 'axios';
import './forgotpass.css';
import { useNavigate } from 'react-router-dom';

const Forgotpass = () => {
  const [step, setStep] = useState(1);

  // form state
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ui state
  const [errorMessage, setErrorMessage] = useState('');
  const [API_BASE_URL, setApiBaseUrl] = useState('');

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const navigate = useNavigate();

  // Load API base URL
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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Please enter your email.');
      return;
    }

    setIsSendingOtp(true);
    try {
      const { status, data } = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (status === 200) {
        // Move directly to the combined OTP + Reset form
        setStep(2);
      } else {
        setErrorMessage(data?.response || 'Failed to send OTP.');
      }
    } catch (err) {
      console.error('Error sending OTP:', err?.response);
      setErrorMessage(err?.response?.data?.response || 'Error sending OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!otp.trim()) {
      setErrorMessage('Please enter the OTP sent to your email.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter a new password.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsResettingPassword(true);
    try {
      const { status, data } = await axios.put(
        `${API_BASE_URL}/auth/forgot-password`,
        { email, otp, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (status === 200) {
        alert('Password reset successful!');
        navigate('/participate');
      } else {
        setErrorMessage(data?.response || 'Error resetting password.');
      }
    } catch (err) {
      console.error('Error resetting password:', err?.response);
      setErrorMessage(err?.response?.data?.response || 'Error resetting password.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div className="forgotpass-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="forgotpass-content">
        {/* STEP 1: Enter Email -> Send OTP */}
        {step === 1 && (
          <div>
            <h1 className="forh1">Forgot Password</h1>
            <p>Please enter your email to receive an OTP.</p>

            <form className="f11" onSubmit={handleSendOtp}>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="submit-button"
                disabled={isSendingOtp || !email.trim()}
              >
                {isSendingOtp ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Enter OTP + New Password + Confirm Password -> Reset */}
        {step === 2 && (
          <div>
            <h1 className="forh1">Reset Password</h1>
            <p>Enter the OTP sent to <strong>{email}</strong> and your new password.</p>

            <form className="f11" onSubmit={handleResetPassword}>
              <input
                type="text"
                placeholder="Enter OTP"
                className="input-field"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <input
                type="password"
                placeholder="New Password"
                className="input-field"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="input-field"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="submit"
                className="submit-button"
                disabled={isResettingPassword || !otp.trim() || !password.trim() || !confirmPassword.trim()}
              >
                {isResettingPassword ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Forgotpass;
