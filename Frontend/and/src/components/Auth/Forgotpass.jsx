import { useEffect, useState } from 'react';
import axios from 'axios';
import './forgotpass.css';
import { useNavigate } from 'react-router-dom';

const Forgotpass = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [API_BASE_URL, setApiBaseUrl] = useState('');

  // Loading states to block buttons
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

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

  const nextStep = () => setStep((prev) => prev + 1);

  // Request OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSendingOtp(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        console.log('OTP sent successfully:', response.data.response);
        nextStep();
      } else {
        setErrorMessage(response.data.response || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error.response);
      setErrorMessage(error.response?.data?.response || 'Error sending OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP step (without resetting password yet)
  const verifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsVerifyingOtp(true);

    // Just move to step 3 if OTP field is not empty
    if (enteredOtp.trim() === '') {
      setErrorMessage('Please enter the OTP.');
      setIsVerifyingOtp(false);
      return;
    }

    nextStep();
    setIsVerifyingOtp(false);
  };

  // Verify OTP and reset password
  const verifyOtpAndResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsResettingPassword(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/auth/forgot-password`,
        { email, otp: enteredOtp, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        alert('Password reset successful!');
        navigate('/participate');
      } else {
        setErrorMessage(response.data?.response || 'Error resetting password.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.response);
      setErrorMessage(error.response?.data?.response || 'Error verifying OTP.');
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
        {step === 1 && (
          <div>
            <h1 className="forh1">Forgot Password</h1>
            <p>Please enter your email to receive an OTP.</p>
            <form className="f11" onSubmit={sendOtp}>
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
                disabled={isSendingOtp}
              >
                {isSendingOtp ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1>Enter OTP</h1>
            <p>Check your email for the OTP and enter it below.</p>
            <form onSubmit={verifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP"
                className="input-field"
                required
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              <button
                type="submit"
                className="submit-button"
                disabled={isVerifyingOtp}
              >
                {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1>Reset Password</h1>
            <p>Enter your new password below.</p>
            <form onSubmit={verifyOtpAndResetPassword}>
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
                disabled={isResettingPassword}
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
