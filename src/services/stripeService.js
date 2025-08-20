import { loadStripe } from '@stripe/stripe-js';
import api from './http';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async () => {
  const { data } = await api.post(`/create-checkout-session/`);
  return data; // { sessionId, url }
};

export const redirectToCheckout = async () => {
  const stripe = await stripePromise;
  const session = await createCheckoutSession();
  return stripe.redirectToCheckout({ sessionId: session.sessionId });
};

// Export par défaut pour la compatibilité
export default {
  createCheckoutSession,
  redirectToCheckout,
};
