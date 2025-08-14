// src/components/CheckLogin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckLogin = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apiBaseUrl, setApiBaseUrl] = useState("");

  useEffect(() => {
    const initCheck = async () => {
      try {
        // Step 1: Load API base URL
        const res = await fetch("/base_data.json");
        const data = await res.json();
        setApiBaseUrl(data.API_BASE_URL);

        // Step 2: Check token
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get(`${data.API_BASE_URL}/auth/login`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            navigate("/Dashboard");
          } else {
            localStorage.removeItem("token");
          }
        } catch (err) {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Failed to check login:", err);
      } finally {
        setLoading(false);
      }
    };

    initCheck();
  }, [navigate]);

  if (loading) {
    return (
        <div className='h-screen w-screen'>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      </div>
    );
  }

  return children;
};

export default CheckLogin;
