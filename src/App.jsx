import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './components/Contexts/AuthContext.jsx'
import Navbar from './components/Navbar'
import Tabs from './components/IDE/Tabs.jsx'
import SignupForm from './components/Auth/SignupForm'
import LoginForm from './components/Auth/LoginForm'
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.jsx'
import Home from './components/pages/Home.jsx'
import ProjectList from './components/ProjectCRUD/ProjectList'
import CreateProject from './components/ProjectCRUD/CreateProject.jsx'
import EditProject from './components/ProjectCRUD/ProjectIDE/EditProject.jsx'
import Presentation from './components/pages/Presentation'
import PremiumOffer from './components/pages/PremiumOffer'
import Error404 from './components/pages/Error404'
import Error500 from './components/pages/Error500'
import UnderConstruction from './components/pages/UnderConstruction'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import CookieConsent, { Cookies } from 'react-cookie-consent'
import { FaCookieBite } from 'react-icons/fa' // Importer une icône sympa
import './App.css' // Fichier CSS personnalisé
import TermsAndConditions from './components/pages/TermsAndConditions'
import ContactPage from './components/pages/Contact.jsx'

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth()
  return currentUser ? element : <Navigate to="/" replace />
}

function App() {
  useEffect(() => {
    const consentGiven = Cookies.get('userConsent')
    if (consentGiven === 'true') {
      // Ajouter des scripts de suivi ici si nécessaire
    }
  }, [])

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <CookieConsent
          location="bottom"
          buttonText="J'accepte"
          declineButtonText="Je refuse"
          cookieName="userConsent"
          className="custom-cookie-banner" // Classe personnalisée pour le bandeau de cookies
          buttonStyle={{
            color: '#fff',
            background: '#38a169',
            fontSize: '14px',
            padding: '10px 20px',
            borderRadius: '5px',
          }} // Style du bouton accepter
          declineButtonStyle={{
            color: '#fff',
            background: '#e53e3e',
            fontSize: '14px',
            padding: '10px 20px',
            borderRadius: '5px',
          }} // Style du bouton refuser
          expires={150}
          enableDeclineButton
          onAccept={() => {
            Cookies.set('userConsent', 'true', { expires: 150 })
          }}
          onDecline={() => {
            Cookies.set('userConsent', 'false', { expires: 150 })
            Cookies.remove('analyticsCookie')
            Cookies.remove('marketingCookie')
          }}
        >
          <div className="flex items-center">
            <FaCookieBite className="cookie-icon" />{' '}
            {/* Ajout d'une icône sympa */}
            Ce site utilise des cookies pour améliorer votre expérience. En
            continuant, vous acceptez notre politique de cookies.
          </div>
        </CookieConsent>
        <div className="bg-gray-800 min-h-screen flex flex-col text-gray-200">
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Tabs />} />
            <Route
              path="/projectlist"
              element={<PrivateRoute element={<ProjectList />} />}
            />
            <Route
              path="/create-project"
              element={<PrivateRoute element={<CreateProject />} />}
            />
            <Route
              path="/edit-project/:projectId"
              element={<PrivateRoute element={<EditProject />} />}
            />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/premium-offer" element={<PremiumOffer />} />
            <Route path="/cgu" element={<TermsAndConditions />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Gestion des erreurs */}
            <Route path="/500" element={<Error500 />} />
            <Route path="*" element={<Error404 />} />{' '}
            {/* Pour toutes les autres routes, rediriger vers 404 */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
