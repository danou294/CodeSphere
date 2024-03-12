import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProjectForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [collaborator, setCollaborator] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour enregistrer le projet
        console.log("Projet créé avec succès !");
        navigate('/projectlist'); // Rediriger vers la liste des projets après la création
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg min-w-[400px]">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Créer un projet</h2>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">Titre</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                        rows={4}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-600">Auteur</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="collaborator" className="block mb-2 text-sm font-medium text-gray-600">Collaborateur</label>
                    <input
                        type="text"
                        id="collaborator"
                        value={collaborator}
                        onChange={(e) => setCollaborator(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="creationDate" className="block mb-2 text-sm font-medium text-gray-600">Date de création</label>
                    <input
                        type="date"
                        id="creationDate"
                        value={creationDate}
                        onChange={(e) => setCreationDate(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium">Créer le projet</button>
            </form>
        </div>
    );
}

export default CreateProjectForm;
