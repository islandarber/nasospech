import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const AdminLogin = () => {
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true);

    try {
      await login(formData);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-transparent mt-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-black bg-opacity-50 p-6 shadow-lg rounded-lg border border-white border-opacity-20 p-6 w-80"
      >
        <h1 className="text-2xl font-bold text-center text-white mb-4">Admin Login</h1>

        {error && (
          <p className="text-red-500 text-sm mb-2" aria-live="polite">
            {error}
          </p>
        )}

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="off"
          className="mb-2 p-2 border rounded w-full"
        />
        
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="off"
          className="mb-4 p-2 border rounded w-full"
        />
        
        <button 
          type="submit" 
          disabled={loading} 
          className="bg-orange-500 text-white p-2 rounded w-full hover:scale-105 transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
