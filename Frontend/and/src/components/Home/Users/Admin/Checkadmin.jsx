// src/components/AdminProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [apiBaseUrl, setApiBaseUrl] = useState("");
  const token = localStorage.getItem("token");

  // Step 1: Load API_BASE_URL from /base_data.json
  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const res = await fetch("/base_data.json");
        const data = await res.json();
        setApiBaseUrl(data.API_BASE_URL);
      } catch (err) {
        console.error("Failed to load API_BASE_URL", err);
        setIsAdmin(false);
      }
    };
    fetchBaseUrl();
  }, []);

  // Step 2: Verify admin
  useEffect(() => {
    if (!apiBaseUrl) return;
    if (!token) {
      setIsAdmin(false);
      return;
    }

    const checkAdmin = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/auth/Check-admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200 && res.data.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Admin check failed:", err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [apiBaseUrl, token]);

  // Step 3: Loading spinner
  if (isAdmin === null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Step 4: If not admin, redirect
  return isAdmin ? children : <Navigate to="/Dashboard" replace />;
};

export default AdminProtectedRoute;
