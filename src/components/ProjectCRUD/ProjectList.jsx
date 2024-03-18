// ProjectList.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../../firebaseConfig';
import DeleteProject from './DeleteProject';
import PreviewPopup from './PreviewPopup';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const { currentUser } = useAuth();
    const [popupContent, setPopupContent] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
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
        try {
            await deleteDoc(doc(firestore, 'projects', projectId));
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project: ', error);
        }
    };

    const handleProjectHover = (event, project) => {
        if (!isPopupVisible) {
            setPopupContent(project);
            setPopupPosition({
                left: event.target.offsetLeft,
                top: event.target.offsetTop + event.target.offsetHeight,
            });
            setPopupVisibility(true);
        }
    };

    const handleProjectClick = (projectId, tabIndex) => {
        console.log('Redirecting to project:', projectId, 'with tabIndex:', tabIndex);
        navigate(`/project/${projectId}?tabIndex=${tabIndex}`, { replace: true });
    };

    const handleMouseLeave = () => {
        setPopupVisibility(false);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mt-5 mb-8">Liste des projets</h1>
            <div className="grid grid-cols-3 gap-4">
                {projects.map(project => (
                    <div
                        key={project.id}
                        className="relative"
                        onMouseEnter={(event) => handleProjectHover(event, project)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleProjectClick(project.id, project.tabIndex)}
                    >
                        <div className="bg-gray-200 p-6 rounded cursor-pointer hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                            <h2 className="text-xl font-semibold mb-3 text-blue-500">{project.title}</h2>
                            <p className="text-gray-700">{project.description}</p>
                            <div className="flex justify-between mt-4">
                                <Link to={`/update-project/${project.id}`}>
                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                        Modifier
                                    </button>
                                </Link>
                                <DeleteProject projectId={project.id} onDelete={handleDelete} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isPopupVisible && (
                <PreviewPopup
                    project={popupContent}
                    position={popupPosition}
                />
            )}
            <Link to="/create-project">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <span className="text-lg">+</span> Ajouter un projet
                </button>
            </Link>
        </div>
    );
};

export default ProjectList;
