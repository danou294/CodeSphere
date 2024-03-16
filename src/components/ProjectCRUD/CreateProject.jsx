import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../../firebaseConfig';
import { baseProject } from '../../features/redux.js'; // Importer baseProject depuis redux.js

function CreateProject() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            console.error("Veuillez remplir tous les champs !");
            return;
        }
        try {
            const docRef = await addDoc(collection(firestore, "projects"), {
                title,
                description,
                html: baseProject.html, // Utiliser baseProject.html depuis redux.js
                css: baseProject.css, // Utiliser baseProject.css depuis redux.js
                js: baseProject.js, // Utiliser baseProject.js depuis redux.js
                createdAt: serverTimestamp(),
                author: currentUser.uid,
                collaboration: []
            });
            console.log("Document written with ID: ", docRef.id);
            navigate('/projectList');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg min-w-[400px]">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Ajouter un projet</h2>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">Titre</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded-lg"
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium">Ajouter</button>
            </form>
        </div>
    );
}

export default CreateProject;
