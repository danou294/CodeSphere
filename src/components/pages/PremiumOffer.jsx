import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Chargez votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51PuORi2KIj2nivFxkySNKXeLFuV0MV0qgQJ7kvTjLHSWQvfimd4QasOa1AamBuKG8jt56DgGbQHDpdLZ0HQuiccx00SDqRcwLh');

const PremiumOffer = () => {
    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            const response = await fetch('http://localhost:8000/create-checkout-session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price_id: 'prod_QlxFtLx9EY4gqp' })  // Assurez-vous de fournir le bon price_id ici
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
        <div className="bg-gray-100 min-h-screen py-10 px-6">
            <div className="max-w-4xl mx-auto text-gray-800">
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-blue-600">Découvrez nos Offres</h1>
                    <p className="mt-4 text-xl text-gray-700">Choisissez l'offre qui vous convient et libérez tout le potentiel de CodeSphere.</p>
                </header>

                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-600">🌐 Explorateur CodeSphere</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Parfait pour les débutants et ceux qui veulent explorer sans engagement, l'Explorateur CodeSphere vous permet de tester notre plateforme avec des fonctionnalités de base. Commencez un projet, testez des idées et voyez le résultat en temps réel. Notez cependant que vous ne pourrez pas enregistrer ou exporter vos projets.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🚀 <strong>Commencez un Mini Projet :</strong> Expérimentez avec notre éditeur en ligne.</li>
                        <li>🔍 <strong>Visualisez en Temps Réel :</strong> Voyez vos changements instantanément.</li>
                        <li>❌ <strong>Pas d'Exportation ou d'Enregistrement :</strong> Idéal pour de simples tests ou démos.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-600">👤 Membre CodeSphere</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        En tant que membre enregistré, profitez de fonctionnalités supplémentaires pour gérer vos projets plus efficacement. Enregistrez vos travaux, modifiez-les à votre convenance et exportez votre code pour une utilisation ultérieure.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>💾 <strong>Enregistrez vos Projets :</strong> Reprenez votre travail là où vous l'avez laissé.</li>
                        <li>🛠 <strong>Modifiez à tout Moment :</strong> Apportez des modifications quand vous le souhaitez.</li>
                        <li>📂 <strong>Exportez votre Code :</strong> Téléchargez vos projets en fichiers HTML, CSS et JavaScript.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-600">💎 CodeSphere Premium</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Pour les utilisateurs ambitieux, CodeSphere Premium offre des fonctionnalités avancées, y compris l'accès à notre assistant de codage OpenAI. Cet outil puissant vous aide à coder plus rapidement et à résoudre les problèmes complexes, tout en offrant un support prioritaire.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🤖 <strong>Assistant de Codage AI :</strong> Obtenez de l'aide en temps réel avec notre bot OpenAI.</li>
                        <li>🔐 <strong>Support Prioritaire :</strong> Accédez à une assistance prioritaire pour toutes vos questions.</li>
                        <li>📈 <strong>Accès à des Ressources Avancées :</strong> Guides exclusifs, templates premium et plus encore.</li>
                    </ul>
                    <p className="mt-4 text-2xl font-semibold text-blue-600">15€ par mois</p>
                    <button onClick={handleCheckout} className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
                        Souscrire à CodeSphere Premium
                    </button>
                </section>
            </div>
        </div>
    );
};

export default PremiumOffer;
