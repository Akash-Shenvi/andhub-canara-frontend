import { useEffect, useState } from 'react';
import axios from 'axios';
import './forgotpass.css';

const Forgotpass = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [API_BASE_URL, setApiBaseUrl] = useState('');

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

  // Request OTP (using POST instead of GET)
  const sendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        { email },  // Send email as JSON
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
    }
  };

  // Verify OTP and reset password
  const verifyOtpAndResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        { email, otp: enteredOtp, password }, // Send JSON body
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        alert('Password reset successful!');
      } else {
        setErrorMessage(response.data?.response || 'Error resetting password.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.response);
      setErrorMessage(error.response?.data?.response || 'Error verifying OTP.');
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
            <h1 className='forh1'>Forgot Password</h1>
            <p>Please enter your email to receive an OTP.</p>
            <form className='f11' onSubmit={sendOtp}>
              <input type="email" placeholder="Enter your email" className="input-field" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="submit-button">Send OTP</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1>Enter OTP</h1>
            <p>Check your email for the OTP and enter it below.</p>
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <input type="text" placeholder="Enter OTP" className="input-field" required value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} />
              <button type="submit" className="submit-button">Verify OTP</button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1>Reset Password</h1>
            <p>Enter your new password below.</p>
            <form onSubmit={verifyOtpAndResetPassword}>
              <input type="password" placeholder="New Password" className="input-field" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="password" placeholder="Confirm Password" className="input-field" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="submit" className="submit-button">Reset Password</button>
            </form>
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Forgotpass;
