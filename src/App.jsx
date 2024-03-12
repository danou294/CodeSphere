import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Contexts/AuthContext.jsx';
import Navbar from './components/Navbar'; // Assurez-vous que le chemin est correct
import Tabs from "./components/IDE/Tabs.jsx";
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm.jsx";
import Home from './components/Home';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar /> {/* La Navbar est ajoutée ici */}
                <div className="bg-gray-800 min-h-screen flex flex-col text-gray-200">
                    {/* Assurez-vous que Tabs est correctement intégré dans votre layout */}
                    <Routes>
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/editor" element={<Tabs />} />
                        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
