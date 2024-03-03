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
            navigate('/login'); // Redirige l'utilisateur vers la page de connexion après la déconnexion
        }).catch((error) => {
            // Une erreur s'est produite
            console.error('Logout Error', error);
        });
    };

    return (
        <button onClick={handleLogout} className="text-gray-200 bg-red-600 px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-red-500 shadow-md ml-4">
            Déconnexion
        </button>
    );
};

export default LogoutButton;
