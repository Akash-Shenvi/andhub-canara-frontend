// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Protected = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null);
  const [apiBaseUrl, setApiBaseUrl] = useState("");
  const token = localStorage.getItem('token');

  // Step 1: Load API_BASE_URL from /base_data.json
  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const res = await fetch('/base_data.json');
        const data = await res.json();
        setApiBaseUrl(data.API_BASE_URL);
      } catch (err) {
        console.error('Failed to load API_BASE_URL', err);
        setIsVerified(false);
      }
    };
    fetchBaseUrl();
  }, []);

  // Step 2: Verify token after base URL is loaded
  useEffect(() => {
    if (!apiBaseUrl) return; // Wait for API base URL
    if (!token) {
      setIsVerified(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/auth/login`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setIsVerified(true);
        } else {
          localStorage.removeItem('token');
          setIsVerified(false);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setIsVerified(false);
      }
    };

    verifyToken();
  }, [apiBaseUrl, token]);

  // Step 3: Loading spinner
  if (isVerified === null) {
    return (
        <div className='h-screen w-screen'>

      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
        </div>
    );
  }

  return isVerified ? children : <Navigate to="/participate" replace />;
};

export default Protected;
