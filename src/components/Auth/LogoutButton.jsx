// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Déconnexion réussie
            console.log('User signed out');
            navigate('/login'); // Redirigez l'utilisateur vers la page de connexion après la déconnexion
        }).catch((error) => {
            // Une erreur s'est produite
            console.error('Logout Error', error);
        });
    };

    return (
        <button onClick={handleLogout}>Déconnexion</button>
    );
};

export default LogoutButton;
