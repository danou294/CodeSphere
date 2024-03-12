import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

const CreateProject = () => {
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState({
        projectName: '',
        description: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const projectsRef = collection(firestore, 'projects');
            await addDoc(projectsRef, projectData);

            navigate('/'); // Rediriger vers la page d'accueil après la création du projet
        } catch (error) {
            setError('Une erreur s\'est produite lors de la création du projet.');
            console.error('Error creating project:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Créer un nouveau projet</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto" autoComplete="off">
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="projectName" className="block mb-2 font-medium text-gray-600">Nom du projet</label>
                    <input type="text" id="projectName" name="projectName" value={projectData.projectName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-medium text-gray-600">Description</label>
                    <textarea id="description" name="description" value={projectData.description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" rows="4" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium">Créer le projet</button>
            </form>
        </div>
    );
};

export default CreateProject;
