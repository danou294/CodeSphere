import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext'; // Assurez-vous que le chemin est correct
import Tabs from "./components/Tabs";
import PreviewButton from "./components/PreviewButton";
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import LogoutButton from './components/Auth/LogoutButton';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="bg-gray-800 min-h-screen flex flex-col text-gray-200">
                    <div className="px-6 py-5 border-b border-gray-700 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">
                            <span className="text-sm font-light">Welcome to </span>CodeSphere
                        </h1>
                        <PreviewButton />
                        {/* Le bouton de déconnexion est conditionnellement rendu dans LogoutButton */}
                    </div>
                    <Routes>
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/" element={<Tabs />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
