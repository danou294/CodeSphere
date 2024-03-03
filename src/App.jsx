import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext.jsx';
import Navbar from './components/Navbar'; // Assurez-vous que le chemin est correct
import Tabs from "./components/Tabs";
import PreviewButton from "./components/PreviewButton";
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar /> {/* La Navbar est ajoutée ici */}
                <div className="bg-gray-800 min-h-screen flex flex-col text-gray-200">
                    <div className="px-6 py-5 flex justify-between items-center border-b border-gray-700">
                        {/* Si PreviewButton doit rester dans cette zone, assurez-vous qu'il s'aligne bien avec votre UI */}
                        <PreviewButton />
                    </div>
                    {/* Assurez-vous que Tabs est correctement intégré dans votre layout */}
                    <Routes>
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        {/* La route principale pour Tabs */}
                        <Route path="/" element={<Tabs />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
