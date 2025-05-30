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
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const trimmedUsername = formData.username.trim();
    const trimmedPassword = formData.password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      await login({ username: trimmedUsername, password: trimmedPassword });
      setSuccess(true);
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
        aria-live="polite"
      >
        <h1 className="text-2xl font-bold text-center text-white mb-4">Admin Login</h1>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {success && (
          <p className="text-green-400 text-sm mb-2">Login successful!</p>
        )}

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="username"
          aria-label="Username"
          className="mb-2 p-2 border rounded w-full"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"
          aria-label="Password"
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
