// src/components/Auth/SignupForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'git // Corrigez le chemin si nécessaire
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Corrigez le chemin si nécessaire

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { currentUser } = useAuth(); // Utilisez useAuth pour accéder à currentUser

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            return setError("Le mot de passe doit contenir au moins 6 caractères.");
        }

        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Inscription réussie !");
        } catch (error) {
            setError("Erreur d'inscription : " + error.message);
        }
    };

    if (currentUser) {
        return <div>Vous êtes déjà inscrit et connecté.</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
            />
            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default SignupForm;
