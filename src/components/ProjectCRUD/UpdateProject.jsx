import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

function UpdateProject() {
    const { projectId } = useParams();
    const navigate = useNavigate(); // Initialiser useNavigate
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const docRef = doc(firestore, 'projects', projectId);
                const projectSnapshot = await getDoc(docRef);
                if (projectSnapshot.exists()) {
                    setProject({ id: projectSnapshot.id, ...projectSnapshot.data() });
                } else {
                    console.error('Le projet avec cet ID n\'existe pas.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du projet : ', error);
            }
        };

        fetchProject();
    }, [projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(firestore, 'projects', projectId);
            await updateDoc(docRef, {
                title: project.title,
                description: project.description,
            });
            navigate('/projectlist'); // Rediriger vers la liste des projets après la modification réussie
        } catch (error) {
            console.error('Erreur lors de la modification du projet : ', error);
        }
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mt-5 mb-8">Modifier le projet</h1>
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg min-w-[400px]">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Modifier le projet "{project.title}"</h2>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">Titre</label>
                    <input
                        type="text"
                        id="title"
                        value={project.title}
                        onChange={(e) => setProject({ ...project, title: e.target.value })}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">Description</label>
                    <textarea
                        id="description"
                        value={project.description}
                        onChange={(e) => setProject({ ...project, description: e.target.value })}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded-lg"
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium">Enregistrer les modifications</button>
            </form>
        </div>
    );
}

export default UpdateProject;
