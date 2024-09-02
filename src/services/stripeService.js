import { loadStripe } from '@stripe/stripe-js';

// Remplacez cette clé par votre clé publique de Stripe
const stripePromise = loadStripe('pk_test_51PuORi2KIj2nivFxkySNKXeLFuV0MV0qgQJ7kvTjLHSWQvfimd4QasOa1AamBuKG8jt56DgGbQHDpdLZ0HQuiccx00SDqRcwLh');

const createCheckoutSession = async () => {
    try {
        const response = await fetch('/create-checkout-session', { method: 'POST' });
        if (!response.ok) throw new Error('Network response was not ok.');
        const session = await response.json();
        return session;
    } catch (error) {
        console.error('Failed to create checkout session:', error);
        throw error;
    }
};

const redirectToCheckout = async (sessionId) => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
        console.error('Failed to redirect to checkout:', result.error.message);
        throw result.error;
    }
};

export default {
    createCheckoutSession,
    redirectToCheckout
};
