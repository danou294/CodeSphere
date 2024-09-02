import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Chargez votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51PuORi2KIj2nivFxkySNKXeLFuV0MV0qgQJ7kvTjLHSWQvfimd4QasOa1AamBuKG8jt56DgGbQHDpdLZ0HQuiccx00SDqRcwLh');

const PaymentComponent = () => {
    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            const response = await fetch('http://localhost:8000/create-checkout-session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
                        const session = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Failed to start the checkout process:', error);
            alert('Failed to start the checkout process. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Page de Paiement</h1>
            <p>Préparez-vous à finaliser votre abonnement Premium!</p>
            <button onClick={handleCheckout} className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
                Payer avec Stripe
            </button>
        </div>
    );
};

export default PaymentComponent;
