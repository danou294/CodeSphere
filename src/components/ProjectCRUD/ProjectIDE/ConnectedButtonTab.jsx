// ConnectedButtonTab.jsx
import React from 'react'

export default function ConnectedButtonTab({
  id,
  toggleTab,
  imgURL,
  buttonContent,
  isActive,
}) {
  return (
    <button
      onClick={() => toggleTab(id)}
      className={`flex items-center w-full px-3 py-2 rounded ${
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
      } hover:bg-blue-400 transition-colors duration-200`}
    >
      <img src={imgURL} alt="" className="w-5 h-5 mr-2" />
      {buttonContent}
    </button>
  )
}
