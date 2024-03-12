import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Contexts/AuthContext.jsx'; // Importez useAuth pour vérifier l'authentification
import Navbar from './components/Navbar';
import Tabs from "./components/IDE/Tabs.jsx";
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm.jsx";
import Home from './components/Home';
import ProjectList from './components/ProjectCRUD/ProjectList'; // Importez le composant ProjectList

// Composant PrivateRoute qui vérifie si l'utilisateur est connecté avant de rendre le composant
const PrivateRoute = ({ element, ...rest }) => {
    const { currentUser } = useAuth(); // Obtenez l'état de l'authentification depuis le contexte
    return currentUser ? (
        element
    ) : (
        <Navigate to="/" replace /> // Redirigez vers la page d'accueil si l'utilisateur n'est pas connecté
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="bg-gray-800 min-h-screen flex flex-col text-gray-200">
                    <Routes>
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/editor" element={<Tabs />} />
                        <Route path="/projectlist" element={<PrivateRoute element={<ProjectList />} />} /> {/* Utilisation de PrivateRoute ici */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
