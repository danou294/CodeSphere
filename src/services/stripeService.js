import { loadStripe } from '@stripe/stripe-js';

// Charger l'URL de base de l'API et la clé publique Stripe depuis les variables d'environnement
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Utiliser la clé publique de Stripe chargée depuis les variables d'environnement
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const createCheckoutSession = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/create-checkout-session/`, { method: 'POST' });
        if (!response.ok) throw new Error('Network response was not ok.');
        const session = await response.json();
        return session;
    } catch (error) {
        console.error('Failed to create checkout session:', error);
        throw error;
    }
};

export default {
    createCheckoutSession,
};
