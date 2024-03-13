import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth, firestore } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Concatenate address parts before storing
            const fullAddress = `${addressLine1}, ${addressLine2}, ${city}`;
            // Store additional user info in Firestore
            await setDoc(doc(firestore, "users", user.uid), {
                email,
                firstName,
                lastName,
                address: fullAddress,
                gender,
                dateOfBirth,
            });
            console.log("Inscription réussie !");
            navigate('/'); // Redirect to home or dashboard page
        } catch (error) {
            setError("Erreur d'inscription : " + error.message);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            setError("Erreur d'authentification avec Google : " + error.message);
        }
    };

    const signInWithGithub = async () => {
        const provider = new GithubAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/');
        } catch (error) {
            setError("Erreur d'authentification avec GitHub : " + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="m-4 p-10 bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Inscription</h2>
                {error && <div className="mb-5 bg-red-100 text-red-700 p-3 rounded">{error}</div>}

                <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <div className="mb-5">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-600">Prénom</label>
                            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-600">Nom</label>
                            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-600">Date de naissance</label>
                            <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Mot de passe</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-600">Confirmez le mot de passe</label>
                            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="addressLine1" className="block mb-2 text-sm font-medium text-gray-600">Adresse Ligne 1</label>
                            <input type="text" id="addressLine1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="addressLine2" className="block mb-2 text-sm font-medium text-gray-600">Adresse Ligne 2 (Optionnel)</label>
                            <input type="text" id="addressLine2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-600">Ville</label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-600">Sexe</label>
                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required className="text-black w-full p-2 border border-gray-300 rounded-lg">
                                <option value="">Sélectionnez</option>
                                <option value="male">Homme</option>
                                <option value="female">Femme</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium">S'inscrire</button>

                <div className="flex flex-col items-center mt-4">
                    <button onClick={signInWithGoogle} type="button" className="mt-3 w-full p-3 bg-red-500 text-white rounded-lg font-medium flex items-center justify-center">
                        <img src="/Assets/Google.png" alt="Google" className="w-6 h-6 mr-2" />
                        S'inscrire avec Google
                    </button>
                    <button onClick={signInWithGithub} type="button" className="mt-3 w-full p-3 bg-gray-600 text-white rounded-lg font-medium flex items-center justify-center">
                        <img src="/Assets/github.png" alt="GitHub" className="w-6 h-6 mr-2" />
                        S'inscrire avec GitHub
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
