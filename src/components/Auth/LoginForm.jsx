// src/LoginForm.jsx
import React, { useState } from 'react';
import { auth } from './../../firebaseConfig.js';
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Connexion réussie !");
        } catch (error) {
            console.error("Erreur de connexion :", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
            />
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default LoginForm;
