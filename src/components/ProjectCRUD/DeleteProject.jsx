import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour la redirection
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

const DeleteProject = ({ projectId, onDelete }) => {
    const navigate = useNavigate(); // Initialiser useNavigate

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(firestore, 'projects', projectId));
            onDelete(projectId);
            navigate('/projectlist'); // Rediriger vers la page /projects après la suppression
        } catch (error) {
            console.error('Erreur lors de la suppression du projet : ', error);
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Supprimer
        </button>
    );
};

export default DeleteProject;
