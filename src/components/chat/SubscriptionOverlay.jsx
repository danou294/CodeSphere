import React from 'react'

const SubscriptionOverlay = ({ message, onClick, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Débloquez l'Accès Complet !
        </h2>
        <p className="mb-6 text-lg">{message}</p>
        <button
          onClick={onClick}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-800 transition duration-300"
        >
          Passer à Premium
        </button>
      </div>
    </div>
  )
}

export default SubscriptionOverlay
