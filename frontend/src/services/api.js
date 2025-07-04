import axios from "axios";

const api = axios.create({
  baseURL: "https://event-management-dashboard-neix.onrender.com/api",
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
