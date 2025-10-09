import { loadStripe } from '@stripe/stripe-js';
import api from './http';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async () => {
  
  try {
    const { data } = await api.post(`/create-checkout-session/`);
    return data; // { sessionId, url }
  } catch (error) {
    console.error('❌ [STRIPE SERVICE] Erreur création session:', error);
    throw error;
  }
};

export const redirectToCheckout = async () => {
  
  try {
    const stripe = await stripePromise;
    
    const session = await createCheckoutSession();
    
    const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });
    
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
