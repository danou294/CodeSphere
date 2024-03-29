// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/Assets/logo.png';
import { useAuth } from './Contexts/AuthContext.jsx'; // Importez le contexte d'authentification

const Home = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Obtenez l'utilisateur actuellement connecté depuis le contexte d'authentification

    const handleStartProject = () => {
        if (currentUser) {
            navigate('/projectlist'); // Redirigez vers la liste des projets si l'utilisateur est connecté
        } else {
            navigate('/editor'); // Redirigez vers l'éditeur si l'utilisateur n'est pas connecté
        }
    };

    return (
        <div className="home-container text-center p-10">
            <div className="max-w-48 mx-auto"> {/* Ajout de la classe max-w-48 pour définir la largeur maximale de la div */}
                <img src={logo} alt="CodeSphere Logo" className="mx-auto w-full h-auto" /> {/* Modification des classes de l'image */}
            </div>
            <h1 className="text-4xl font-bold mt-5">Bienvenue sur CodeSphere</h1>
            <p className="text-lg mt-5">
                Découvrez l'expérience ultime de codage en ligne avec CodeSphere. Notre application innovante vous permet de créer, éditer et prévisualiser vos projets HTML, CSS, et JavaScript en temps réel, directement depuis votre navigateur. Que vous soyez un développeur expérimenté ou un passionné de technologie, CodeSphere est l'outil idéal pour donner vie à vos idées web.
            </p>
            <p className="text-lg mt-5">
                Avec CodeSphere, profitez d'une plateforme complète pour gérer vos projets : de l'inscription simplifiée avec Google ou GitHub, à la collaboration en temps réel. Commencez dès maintenant et rejoignez la communauté de créateurs qui révolutionnent le développement web.
            </p>
            <div className="mt-10">
                <button
                    onClick={handleStartProject}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Commencer un projet
                </button>
            </div>
        </div>
    );
};

export default Home;
