// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext'; // Ajustez le chemin si nécessaire
import LogoutButton from './Auth/LogoutButton'; // Assurez-vous que le chemin est correct

const Navbar = () => {
    const { currentUser } = useAuth();

    return (
        <div className="bg-gray-800 px-6 py-5 flex justify-between items-center border-b border-gray-700">
            <Link to="/" className="text-xl font-semibold text-white">
                Welcome to <span className="text-sm font-light">CodeSphere</span>
            </Link>
            <div className="flex items-center gap-4">
                {currentUser ? (
                    <LogoutButton />
                ) : (
                    <>
                        <Link to="/login" className="text-gray-200 bg-blue-500 px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-blue-400 shadow-md">
                            Se connecter
                        </Link>
                        <Link to="/signup" className="text-gray-200 bg-green-500 px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-green-400 shadow-md">
                            S'inscrire
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
