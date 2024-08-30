// Error500.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Error500 = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-red-600">500</h1>
            <p className="mt-4 text-2xl text-gray-700">Erreur Interne du Serveur</p>
            <p className="mt-2 text-gray-500">Oups! Quelque chose a mal tourné. Nous travaillons pour résoudre le problème.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default Error500;
