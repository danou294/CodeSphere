import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() !== '') {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <div className="flex-none p-4 border-t border-gray-200">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 border rounded"
            />
            <button onClick={handleSend} className="mt-2 bg-blue-500 text-white p-2 rounded">Send</button>
        </div>
    );
};

export default ChatInput;
