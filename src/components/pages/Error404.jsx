import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-2xl text-gray-700">Page non trouvée</p>
            <p className="mt-2 text-gray-500">Il semble que la page que vous cherchez n'existe pas.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default Error404;
