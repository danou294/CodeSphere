// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/Assets/logo.png';

const Home = () => {
    const navigate = useNavigate();

    const handleStartProject = () => {
        navigate('/editor'); // Redirigez vers la page de l'éditeur ou du projet
    };

    return (
        <div className="home-container text-center p-10">
            <img src={logo} alt="CodeSphere Logo" className="mx-auto w-48 h-48" />
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
