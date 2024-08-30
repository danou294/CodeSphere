// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/Assets/logo.png';
import { useAuth } from '../Contexts/AuthContext.jsx';

const Home = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleStartProject = () => {
        if (currentUser) {
            navigate('/projectlist');
        } else {
            navigate('/editor');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-6">
            <div className="max-w-4xl mx-auto text-gray-800">
                <div className="text-center mb-10">
                    <img src={logo} alt="CodeSphere Logo" className="mx-auto w-48 h-auto" />
                    <h1 className="text-5xl font-bold text-blue-600 mt-5">Bienvenue sur CodeSphere</h1>
                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                        CodeSphere est votre plateforme de codage en ligne de confiance, offrant une expérience de développement web immersive et interactive. Que vous soyez un développeur professionnel ou un passionné de technologie, CodeSphere vous permet de créer, éditer et prévisualiser vos projets en <strong>HTML, CSS, et JavaScript</strong> en temps réel, directement depuis votre navigateur.
                    </p>
                </div>
                <div className="text-center">
                    <button
                        onClick={handleStartProject}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
                    >
                        Commencer dès maintenant
                    </button>
                </div>
                <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-blue-600">Pourquoi choisir CodeSphere ?</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-4">
                        <li>Édition en temps réel et prévisualisation instantanée.</li>
                        <li>Interface intuitive et facile à utiliser.</li>
                        <li>Intégration facile avec Google et GitHub pour un accès rapide.</li>
                        <li>Support communautaire et tutoriels pour apprendre et évoluer.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
