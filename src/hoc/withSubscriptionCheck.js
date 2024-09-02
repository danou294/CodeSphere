import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Contexts/AuthContext'; // Assure-toi que le chemin est correct
import { firestore } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const withSubscriptionCheck = (WrappedComponent) => {
    return (props) => {
        const { currentUser } = useAuth();
        const [hasAccess, setHasAccess] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            const checkSubscription = async () => {
                if (!currentUser) {
                    toast.warning('Veuillez vous connecter pour accéder à cette fonctionnalité.');
                    navigate('/login');
                    return;
                }

                try {
                    const userRef = doc(firestore, 'users', currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists() && userSnap.data().hasPaidForChatbot) {
                        setHasAccess(true);
                    } else {
                        toast.warning('Vous devez souscrire à l\'offre premium pour accéder à cette fonctionnalité.');
                        navigate('/premium-offer');
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification de l\'abonnement :', error);
                    toast.error('Erreur lors de la vérification de l\'abonnement.');
                }
            };

            checkSubscription();
        }, [currentUser, navigate]);

        if (!hasAccess) {
            return null; // ou un loader si tu veux montrer quelque chose en attendant
        }

        return <WrappedComponent {...props} />;
    };
};

export default withSubscriptionCheck;
