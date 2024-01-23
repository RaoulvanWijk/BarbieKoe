import React, { useState } from 'react';
import Chat from "@/components/Chat/Chat";


const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>Open Chatbot</button>
      {isOpen && (
        <div className="popup">
          <button onClick={togglePopup}>Close</button>
          <Chat />
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
