import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../../firebaseConfig';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUserProjects = async () => {
            if (currentUser) {
                const userProjectsCollection = collection(firestore, 'projects');
                const querySnapshot = await getDocs(userProjectsCollection);
                const userProjectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(userProjectsData);
            }
        };

        fetchUserProjects();

        // Nettoyer les écouteurs de Firebase lors du démontage du composant
        return () => {};
    }, [currentUser]);

    const handleDelete = async (projectId) => {
        try {
            await deleteDoc(doc(firestore, 'projects', projectId));
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Erreur lors de la suppression du projet : ', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mt-5 mb-8">Liste des projets</h1>
            <div className="grid grid-cols-3 gap-4">
                {projects.map(project => (
                    <div key={project.id} className="bg-gray-200 p-6 rounded cursor-pointer hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-3 text-blue-500">{project.title}</h2>
                        <p className="text-gray-700">{project.description}</p>
                        <div className="flex justify-between mt-4">
                            <UpdateProject projectId={project.id} />
                            <DeleteProject projectId={project.id} onDelete={handleDelete} />
                        </div>
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
