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
        <div className="home-container text-center p-10 bg-blue-50 min-h-screen overflow-hidden"> {/* Enlever les marges et paddings inutiles */}
            <div className="max-w-screen-md mx-auto">
                <img src={logo} alt="CodeSphere Logo" className="mx-auto w-64 h-auto mb-0" /> {/* Ajout de mb-0 pour enlever la marge en bas */}
            </div>
            <h1 className="text-5xl font-extrabold mt-5 mb-0 text-blue-600">Bienvenue sur CodeSphere</h1> {/* Utilisation de mb-0 pour enlever la marge en bas */}
            <p className="text-lg mt-5 mb-0 text-gray-700">
                <strong>CodeSphere</strong>, votre plateforme de codage en ligne de confiance, offre une expérience de développement web <strong>immersive et interactive</strong>. Créez, éditez et prévisualisez vos projets en <strong>HTML, CSS, et JavaScript</strong> en temps réel directement depuis votre navigateur.
            </p>
            <p className="text-lg mt-5 mb-0 text-gray-700">
                Que vous soyez un <strong>développeur professionnel</strong> ou un <strong>passionné de technologie</strong>, CodeSphere est conçu pour <strong>simplifier</strong> votre flux de travail avec des fonctionnalités telles que l'<strong>inscription simplifiée via Google ou GitHub</strong>, et une <strong>collaboration en temps réel</strong>.
            </p>
            <p className="text-lg mt-5 mb-0 text-gray-700">
                Rejoignez notre <strong>communauté innovante</strong> et commencez à transformer vos idées en réalité aujourd'hui avec CodeSphere.
            </p>
            <div className="mt-10 mb-0">
                <button
                    onClick={handleStartProject}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
                >
                    Commencer des maintenant
                </button>
            </div>
            <div className="mt-10 flex justify-center mb-0"> {/* Ajout de mb-0 pour enlever la marge en bas */}
                <div className="p-4 w-auto max-w-md text-left bg-white rounded-lg shadow-lg mb-0"> {/* Ajout de mb-0 pour enlever la marge en bas */}
                    <h2 className="text-2xl font-bold text-blue-600">Pourquoi choisir CodeSphere?</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-3">
                        <li>Édition en temps réel</li>
                        <li>Intégration facile avec Google et GitHub</li>
                        <li>Interface utilisateur intuitive</li>
                        <li>Support et communauté actifs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
