import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { toast } from 'react-toastify'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        toast.success('Connexion réussie !')
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      toast.error('Erreur de connexion Google : ' + error.message)
    }
  }

  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      toast.error('Erreur de connexion GitHub : ' + error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      toast.error('Erreur de connexion : ' + error.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white rounded-lg shadow-lg min-w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Connexion</h2>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-black p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-black p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium"
        >
          Se connecter
        </button>
        <div className="mt-4 flex flex-col space-y-2">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full p-3 bg-red-500 text-white rounded-lg font-medium flex items-center justify-center"
          >
            <img
              src="/Assets/Google.png"
              alt="Google"
              className="w-6 h-6 mr-2"
            />
            Se connecter avec Google
          </button>
          <button
            onClick={handleGithubSignIn}
            type="button"
            className="w-full p-3 bg-gray-600 text-white rounded-lg font-medium flex items-center justify-center"
          >
            <img
              src="/Assets/github.png"
              alt="GitHub"
              className="w-6 h-6 mr-2"
            />
            Se connecter avec GitHub
          </button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-blue-600 hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          En continuant, vous acceptez nos{' '}
          <Link to="/cgu" className="text-blue-600 underline">
            conditions d'utilisation
          </Link>
          .
        </p>
      </form>
    </div>
  )
}

export default LoginForm
