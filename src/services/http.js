import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ex: https://api.codesphere.fr/api
  timeout: 20000,
});

api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(); // ID token Firebase
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // logging minimal + propagation
    console.error("API error:", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);

export default api;
