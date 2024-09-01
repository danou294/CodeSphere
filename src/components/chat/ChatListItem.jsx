import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ChatListItem = ({ session, onDelete }) => {
    return (
        <li className="flex items-center justify-between mb-2 p-2 bg-white shadow rounded">
            <span>Chat #{session.id}</span>
            <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </li>
    );
};

export default ChatListItem;
