import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour créer des liens dans React Router


const ProjectList = () => {
    const projects = [
        { title: 'Projet 1', description: 'Description du projet 1' },
        { title: 'Projet 2', description: 'Description du projet 2' },
        { title: 'Projet 3', description: 'Description du projet 3' },
        // Ajoutez plus de projets si nécessaire
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mt-5 mb-8">Liste des projets</h1>
            <div className="grid grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <div key={index} className="bg-gray-200 p-6 rounded cursor-pointer hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-3 text-blue-500">{project.title}</h2>
                        <p className="text-gray-700">{project.description}</p>
                    </div>
                ))}
            </div>
            <Link to="/create-project">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <span className="text-lg">+</span> Ajouter un projet
                </button>
            </Link>
        </div>
    );
};

export default ProjectList;
