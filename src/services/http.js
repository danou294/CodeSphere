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
    try {
      // Force le renouvellement du token pour éviter les tokens expirés
      const token = await user.getIdToken(true); // true = force refresh
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Erreur lors de l'obtention du token Firebase:", error);
      // Si on ne peut pas obtenir de token, on continue sans Authorization header
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    // Gestion des erreurs d'authentification
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      console.warn("Token expiré ou invalide, tentative de renouvellement...");
      
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        try {
          // Force le renouvellement du token
          const newToken = await user.getIdToken(true);
          
          // Retente la requête avec le nouveau token
          const originalRequest = err.config;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Impossible de renouveler le token:", refreshError);
          // Rediriger vers la page de connexion si nécessaire
          // window.location.href = '/login';
        }
      }
    }
    
    // logging minimal + propagation
    console.error("API error:", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);

export default api;
