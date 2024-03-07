import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebaseConfig';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Un email de réinitialisation a été envoyé. Veuillez vérifier votre boîte de réception.");
        } catch (error) {
            setError("Erreur lors de la demande de réinitialisation du mot de passe: " + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg min-w-[400px]">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Réinitialisation du mot de passe</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>}
                {message && <p className="bg-green-100 text-green-700 p-3 rounded">{message}</p>}
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
                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium">Envoyer l'email de réinitialisation</button>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;
