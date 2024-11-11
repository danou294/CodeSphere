import React from 'react'

const ChatListItem = ({ session, isSelected, onSelect, onDelete }) => {
  return (
    <li
      className={`p-2 mb-2 cursor-pointer rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'} hover:bg-blue-700 transition-colors duration-200`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold">{`Conversation n°${session.id}`}</span>
        <button onClick={onDelete} className="text-red-500">
          X
        </button>
      </div>
    </li>
  )
}

export default ChatListItem
