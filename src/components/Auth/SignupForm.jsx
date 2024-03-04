// src/SignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Assurez-vous que le chemin est correct

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Inscription réussie !");
            navigate('/'); // Redirige vers l'IDE en ligne après une inscription réussie
        } catch (error) {
            setError("Erreur d'inscription : " + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg min-w-[400px]">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Inscription</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-600">Confirmez le mot de passe</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium">S'inscrire</button>
            </form>
        </div>
    );
}

export default SignupForm;
