import React, { useState } from 'react';
import Chat from "@/components/Chat/Chat";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div> 
      <button onClick={togglePopup}>
        {isOpen ? 'Close Chatbot' : 'Open Chatbot'}
      </button>
      {isOpen && (
        <div className="popup">
          <Chat />
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
