import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './components/Contexts/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import ModernIDE from './components/IDE/ModernIDE.jsx'
import Home from './components/pages/Home.tsx'
import PremiumOffer from './components/pages/PremiumOffer.tsx'
import ModernEditProject from './components/ProjectCRUD/ProjectIDE/ModernEditProject.jsx'
import CreateProject from './components/ProjectCRUD/CreateProject.jsx'
import EditProject from './components/ProjectCRUD/ProjectIDE/EditProject.jsx'
import ProjectList from './components/ProjectCRUD/ProjectList.jsx'
import Contact from './components/pages/Contact.jsx'
import Presentation from './components/pages/Presentation.jsx'
import TermsAndConditions from './components/pages/TermsAndConditions.tsx'
import UnderConstruction from './components/pages/UnderConstruction.jsx'
import Error404 from './components/pages/Error404.jsx'
import Error500 from './components/pages/Error500.jsx'
import LoginForm from './components/Auth/LoginForm.jsx'
import SignupForm from './components/Auth/SignupForm.jsx'
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.jsx'
import LogoutButton from './components/Auth/LogoutButton.jsx'
import ChatSidebar from './components/chat/ChatSidebar.jsx'
import ChatPanel from './components/chat/ChatPanel.jsx'
import ChatButton from './components/chat/ChatButton.jsx'
import ChatInput from './components/chat/ChatInput.jsx'
import ChatListItem from './components/chat/ChatListItem.jsx'
import SubscriptionOverlay from './components/chat/SubscriptionOverlay.jsx'
import CookieConsent from 'react-cookie-consent'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen animated-bg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ide" element={<ModernIDE />} />
            <Route path="/premium-offer" element={<PremiumOffer />} />
            <Route path="/edit-project/:id" element={<ModernEditProject />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/edit-project-old/:id" element={<EditProject />} />
            <Route path="/projectlist" element={<ProjectList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/under-construction" element={<UnderConstruction />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="/500" element={<Error500 />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/chat" element={<ChatSidebar />} />
            <Route path="/chat/:id" element={<ChatPanel />} />
            <Route path="/chat-button" element={<ChatButton />} />
            <Route path="/chat-input" element={<ChatInput />} />
            <Route path="/chat-list-item" element={<ChatListItem />} />
            <Route path="/subscription-overlay" element={<SubscriptionOverlay />} />
          </Routes>
          
          <Footer />
          
          <CookieConsent
            location="bottom"
            buttonText="Accepter"
            declineButtonText="Refuser"
            cookieName="codesphere_cookie_consent"
            style={{ 
              background: 'hsl(var(--surface-900))', 
              color: 'hsl(var(--surface-100))',
              borderTop: '1px solid hsl(var(--surface-700))'
            }}
            buttonStyle={{ 
              background: 'hsl(var(--primary-600))', 
              color: 'white', 
              fontSize: '14px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none'
            }}
            declineButtonStyle={{ 
              background: 'hsl(var(--surface-700))', 
              color: 'hsl(var(--surface-100))', 
              fontSize: '14px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none'
            }}
          >
            Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.
          </CookieConsent>
          
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
