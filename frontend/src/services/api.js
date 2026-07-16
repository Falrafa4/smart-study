import axios from "axios";

// Ensure baseURL always ends with /api so frontend paths match backend routes
const configuredBase = import.meta.env.VITE_API_BASE_URL || "https://api-smartstudy.naufalrafa.my.id/api";
const baseURL = configuredBase.endsWith("/api") ? configuredBase : `${configuredBase}/api`;

const api = axios.create({
  baseURL,
  withCredentials: false, // using JWT in Authorization header
});

// Attach JWT from localStorage to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
