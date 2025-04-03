import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(true);

  // Helper function to check if token is expired
  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
  };

  // Login function
  const login = async (formData) => {
    setLoading(true);
    setShowAll(true);
    setError(null); // Clear previous errors

    const api_url = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${api_url}/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, user } = response.data;
      localStorage.setItem("jwt", token);
      setToken(token);
      setUser(user);
      navigate("/admin/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage); 
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
    navigate("/admin/login");
  };

  // Fetch user data if token exists and isn't expired
  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        logout();
        return;
      }

      const getUser = async () => {
        const api_url = import.meta.env.VITE_BACKEND_URL;
        try {
          const response = await axios.get(`${api_url}/user/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          logout();
        }
      };
      getUser();
    }
  }, [token]);

  // Auto-logout after a period of inactivity or token expiration
  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        logout();
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading, error, showAll, setShowAll }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
