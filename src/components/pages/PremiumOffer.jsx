import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string';
import { useAuth } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import { firestore } from '../../firebaseConfig';
import { doc, updateDoc, getDoc } from "firebase/firestore";

// Chargez votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51PuORi2KIj2nivFxkySNKXeLFuV0MV0qgQJ7kvTjLHSWQvfimd4QasOa1AamBuKG8jt56DgGbQHDpdLZ0HQuiccx00SDqRcwLh');

const PremiumOffer = () => {
    const { currentUser } = useAuth(); 
    const location = useLocation();

    useEffect(() => {
        // Vérifie si c'est un retour de redirection de Checkout
        const values = QueryString.parse(location.search);

        if (values.success) {
            toast.success('Paiement réussi! Vous avez maintenant accès au chatbot.');
            // Mettre à jour l'utilisateur après un paiement réussi
            updateUserSubscriptionStatus(true);
        }

        if (values.canceled) {
            toast.info('Paiement annulé. Vous pouvez continuer à explorer les offres.');
        }
    }, [location.search]);

    const updateUserSubscriptionStatus = async (status) => {
        try {
            const userRef = doc(firestore, 'users', currentUser.uid);
            await updateDoc(userRef, { hasPaidForChatbot: status });
            toast.success('Votre statut de souscription a été mis à jour.');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de souscription :', error);
            toast.error('Erreur lors de la mise à jour du statut de souscription.');
        }
    };

    const handleCheckout = async () => {
        if (!currentUser) {
            toast.warning('Veuillez vous connecter pour souscrire à l\'offre premium.');
            return;
        }

        try {
            const userRef = doc(firestore, 'users', currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists() && userSnap.data().hasPaidForChatbot) {
                toast.info('Vous avez déjà payé pour l\'offre premium.');
                return;
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du statut de souscription :', error);
            toast.error('Erreur lors de la vérification du statut de souscription.');
            return;
        }

        try {
            const stripe = await stripePromise;
            const response = await fetch('http://localhost:8000/create-checkout-session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price_id: 'prod_QlxFtLx9EY4gqp' })
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Response text:', text);
                toast.error('Erreur lors de la création de la session de paiement.');
                return;
            }

            const session = await response.json();
            window.location.href = session.url;
        } catch (error) {
            console.error('Failed to start the checkout process:', error);
            toast.error('Échec du démarrage du processus de paiement. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-6">
            <div className="max-w-4xl mx-auto text-gray-800">
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-blue-600">Découvrez Nos Offres Exclusives</h1>
                    <p className="mt-4 text-xl text-gray-700">Libérez tout le potentiel de CodeSphere avec l'offre qui vous convient le mieux. Que vous soyez débutant ou professionnel, nous avons quelque chose pour vous.</p>
                </header>

                {/* Section Explorateur CodeSphere */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-600">🌐 Explorateur CodeSphere</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Idéal pour les curieux et les novices, l'Explorateur CodeSphere vous permet de découvrir les bases de notre plateforme. Commencez des projets simples, testez vos idées et voyez les résultats instantanément. Cependant, notez que les options d'enregistrement et d'exportation ne sont pas disponibles.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🚀 <strong>Commencez un Mini Projet :</strong> Utilisez notre éditeur en ligne pour explorer.</li>
                        <li>🔍 <strong>Visualisez en Temps Réel :</strong> Observez instantanément les changements que vous apportez.</li>
                        <li>❌ <strong>Pas d'Exportation :</strong> Parfait pour des essais rapides et des démonstrations.</li>
                    </ul>
                </section>

                {/* Section Membre CodeSphere */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-600">👤 Membre CodeSphere</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Pour les utilisateurs réguliers qui souhaitent un peu plus de flexibilité, l'offre Membre CodeSphere vous permet d'enregistrer, de modifier et d'exporter vos projets. Reprenez vos travaux à tout moment et sauvegardez vos progrès.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>💾 <strong>Enregistrez vos Projets :</strong> Sauvegardez votre travail et reprenez là où vous vous êtes arrêté.</li>
                        <li>🛠 <strong>Modifiez à tout Moment :</strong> Faites des ajustements quand vous en avez besoin.</li>
                        <li>📂 <strong>Exportez votre Code :</strong> Téléchargez vos projets sous forme de fichiers HTML, CSS et JavaScript.</li>
                    </ul>
                </section>

                {/* Section CodeSphere Premium */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-600">💎 CodeSphere Premium</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Pour ceux qui cherchent à pousser leur créativité plus loin, CodeSphere Premium est fait pour vous. Profitez d'outils avancés, d'un accès prioritaire à notre assistant de codage AI, et d'un support premium. C'est l'expérience ultime pour développer vos projets avec efficacité.
                    </p>
                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li>🤖 <strong>Assistant de Codage AI :</strong> Bénéficiez d'une assistance en temps réel avec notre bot OpenAI.</li>
                        <li>🔐 <strong>Support Prioritaire :</strong> Obtenez une aide rapide pour toutes vos questions techniques.</li>
                        <li>📈 <strong>Accès à des Ressources Avancées :</strong> Accédez à des guides exclusifs, des templates premium et bien plus encore.</li>
                    </ul>
                    <p className="mt-4 text-2xl font-semibold text-blue-600">15€ par mois</p>
                    <button 
                        onClick={handleCheckout} 
                        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Souscrire à CodeSphere Premium
                    </button>
                </section>
            </div>
        </div>
    );
};

export default PremiumOffer;
