// ButtonTab.jsx
import React from 'react'
import { useDispatch } from 'react-redux'
import { hidePreview } from '../../features/preview.js'

export default function ButtonTab({
  id,
  toggleTab,
  buttonContent,
  imgURL,
  isActive,
}) {
  const dispatch = useDispatch()
  const hoverStyle = 'hover:bg-blue-700 hover:text-white' // Ajout du style de hover

  return (
    <button
      onClick={() => {
        toggleTab(id)
        dispatch(hidePreview())
      }}
      className={`flex items-center px-4 py-2 rounded transition duration-150 ease-in-out ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700'} ${hoverStyle}`}
    >
      <img src={imgURL} className="w-6 h-6 mr-3" alt={buttonContent} />
      <span>{buttonContent}</span>
    </button>
  )
}
