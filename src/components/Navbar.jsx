import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './Contexts/AuthContext.jsx'
import { toast } from 'react-toastify'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline' // Utiliser les icônes de Heroicons v1

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Déconnexion réussie !')
      navigate('/')
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error)
      toast.error('Erreur lors de la déconnexion : ' + error.message)
    }
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-white text-2xl font-bold">
                CodeSphere
              </Link>
              <div className="lg:hidden">
                <Disclosure.Button className="text-white focus:outline-none">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <Link to="/contact" className="text-white hover:text-gray-300">
                  Contact
                </Link>
                <Link
                  to="/presentation"
                  className="text-white hover:text-gray-300"
                >
                  À Propos
                </Link>
                <Link
                  to="/premium-offer"
                  className="text-white hover:text-gray-300"
                >
                  Offres Premium
                </Link>
                {currentUser ? (
                  <>
                    <Link
                      to="/projectlist"
                      className="text-white hover:text-gray-300"
                    >
                      Mes Projets
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-3 py-2 rounded"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="bg-green-500 text-white px-3 py-2 rounded"
                    >
                      Inscription
                    </Link>{' '}
                    {/* Nouveau bouton d'inscription */}
                    <Link
                      to="/login"
                      className="bg-blue-500 text-white px-3 py-2 rounded"
                    >
                      Connexion
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel
            className={`lg:hidden transition-all ease-out duration-300 ${open ? 'block' : 'hidden'}`}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/presentation"
                className="block text-white hover:text-gray-300"
              >
                À Propos
              </Link>
              <Link
                to="/premium-offer"
                className="block text-white hover:text-gray-300"
              >
                Offres Premium
              </Link>
              {currentUser ? (
                <>
                  <Link
                    to="/projectlist"
                    className="block text-white hover:text-gray-300"
                  >
                    Mes Projets
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="block bg-green-500 text-white px-3 py-2 rounded"
                  >
                    Inscription
                  </Link>{' '}
                  {/* Nouveau bouton d'inscription */}
                  <Link
                    to="/login"
                    className="block bg-blue-500 text-white px-3 py-2 rounded"
                  >
                    Connexion
                  </Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
