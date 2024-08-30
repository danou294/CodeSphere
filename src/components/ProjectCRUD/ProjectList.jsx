import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../Contexts/AuthContext';
import { firestore } from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const { currentUser } = useAuth();
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const navigate = useNavigate();

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
    }, [currentUser]);

    const handleDelete = async (projectId) => {
        const result = await Swal.fire({
            title: 'Confirmer la suppression',
            text: "Cette action est irréversible. Voulez-vous continuer ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6', // Couleur de confirmation originale
            cancelButtonColor: '#d33',     // Couleur d'annulation originale
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            try {
                await deleteDoc(doc(firestore, 'projects', projectId));
                setProjects(projects.filter(project => project.id !== projectId));
                Swal.fire('Supprimé', 'Votre projet a été supprimé avec succès.', 'success');
            } catch (error) {
                console.error('Error deleting project: ', error);
                Swal.fire('Erreur', 'Impossible de supprimer le projet.', 'error');
            }
        }
    };

    const handleEyeClick = (project) => {
        if (selectedProject === project && isPopupVisible) {
            setPopupVisibility(false);
            setSelectedProject(null);
        } else {
            setSelectedProject(project);
            setPopupVisibility(true);
        }
    };

    return (
        <div className="container mx-auto p-6 relative">
            <h1 className="text-3xl font-bold mt-5 mb-8 text-gray-800">Liste des projets</h1>

            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg shadow-inner">
                    <p className="text-lg font-semibold mb-4 text-gray-600">Aucun projet trouvé</p>
                    <Link to="/create-project">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Créer un nouveau projet
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className="relative p-6 bg-white rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            <h2 className="text-xl font-semibold mb-2 text-gray-700">{project.title}</h2>
                            <p className="text-gray-500 mb-4">{project.description}</p>
                            <div className="absolute bottom-2 right-2 flex space-x-2">
                            <FontAwesomeIcon 
    icon={faEdit} 
    className="text-yellow-500 cursor-pointer hover:text-yellow-700" 
    onClick={() => navigate(`/edit-project/${project.id}`)} // Utiliser navigate pour aller à l'éditeur
/>
                                <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => handleDelete(project.id)} />
                            </div>
                            <button 
                                className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleEyeClick(project)}
                            >
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {isPopupVisible && selectedProject && (
                <div className="fixed bottom-4 right-4 bg-white border rounded-xl shadow-lg p-4 w-80 h-96 transition-opacity duration-300">
                    <iframe
                        className="w-full h-full border-none rounded-lg"
                        srcDoc={`
                            <!DOCTYPE html>
                            <html>
                                <head>
                                    <style>${selectedProject.css}</style>
                                </head>
                                <body>
                                    ${selectedProject.html}
                                    <script>${selectedProject.js}</script>
                                </body>
                            </html>
                        `}
                        sandbox="allow-scripts"
                        title="Preview"
                    ></iframe>
                </div>
            )}

            <Link to="/create-project">
                <button className="absolute top-6 right-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Ajouter un projet
                </button>
            </Link>
        </div>
    );
};

export default ProjectList;
