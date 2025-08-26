// Active les types Vite (import.meta.env, etc.)
/// <reference types="vite/client" />

// Permet d'importer des modules JS/JSX sans d.ts dédiés
declare module '*.jsx';
declare module '*.js';

// Déclarations ciblées (évite les chemins relatifs fragiles)
declare module '@/components/Contexts/AuthContext.jsx' {
  const useAuth: any;
  export default useAuth;
}
declare module '@/components/Contexts/AuthContext' {
  const useAuth: any;
  export default useAuth;
}
declare module '@/services/stripeService.js' {
  const stripeService: any;
  export default stripeService;
}
declare module '@/firebaseConfig.js' {
  export const app: any;
  export const auth: any;
  export const db: any;
  export default app;
}
declare module '@/components/ui/CTA.jsx' {
  const CTA: any;
  export default CTA;
}
