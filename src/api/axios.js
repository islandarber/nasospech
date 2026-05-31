import axios from "axios";

// One axios instance for the whole app, pointed at the backend.
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Attach the JWT (when present) to every request automatically,
// so protected endpoints work without each call wiring up the header.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
