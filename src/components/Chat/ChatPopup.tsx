import { useState } from 'react';
import Chat from "@/components/Chat/Chat";

import "/resources/styles/components/chat/chat.scss";
const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div> 
      <button className='popup-button' onClick={togglePopup}>
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
