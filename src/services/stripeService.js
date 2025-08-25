import { loadStripe } from '@stripe/stripe-js';
import api from './http';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
console.log('🔍 [STRIPE SERVICE] Clé publique chargée:', STRIPE_PUBLIC_KEY ? '✅' : '❌');

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async () => {
  console.log('🔍 [STRIPE SERVICE] Création de session checkout...');
  console.log('🔍 [STRIPE SERVICE] URL API:', import.meta.env.VITE_API_BASE_URL);
  
  try {
    const { data } = await api.post(`/create-checkout-session/`);
    console.log('✅ [STRIPE SERVICE] Session créée:', data);
    return data; // { sessionId, url }
  } catch (error) {
    console.error('❌ [STRIPE SERVICE] Erreur création session:', error);
    throw error;
  }
};

export const redirectToCheckout = async () => {
  console.log('🔍 [STRIPE SERVICE] Début redirection checkout...');
  
  try {
    const stripe = await stripePromise;
    console.log('🔍 [STRIPE SERVICE] Stripe chargé:', !!stripe);
    
    const session = await createCheckoutSession();
    console.log('🔍 [STRIPE SERVICE] Session obtenue, redirection...');
    
    const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });
    console.log('🔍 [STRIPE SERVICE] Résultat redirection:', result);
    
    return result;
  } catch (error) {
    console.error('❌ [STRIPE SERVICE] Erreur redirection:', error);
    throw error;
  }
};

// Export par défaut pour la compatibilité
export default {
  createCheckoutSession,
  redirectToCheckout,
};
