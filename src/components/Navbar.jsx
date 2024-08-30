import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext.jsx';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">CodeSphere</Link>
                <div>
                    {currentUser ? (
                        <>
                            <Link to="/projectlist" className="text-white mr-4">Mes Projets</Link>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded">Déconnexion</button>
                        </>
                    ) : (
                        <>
                            <Link to="/presentation" className="text-white mr-4">Qui sommes nous ?</Link>
                            <Link to="/premium" className="text-white mr-4">Offre Premium</Link>
                            <Link to="/login" className="bg-blue-500 text-white px-3 py-2 rounded">Connexion</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
