import React, { useState } from 'react';

const Chat = () => {
  const [userInput, setUserInput] = useState<any>('');
  const [chatLog, setChatLog] = useState<any>([]);

  const sendMessage = () => {
    // Make a POST request to the Flask server
    fetch('/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'user_input=' + encodeURIComponent(userInput),
    })
      .then(async (response) => await response.text())
      .then(data => {
        // Update chatLog with user input and bot response
        setChatLog([...chatLog, `You: ${userInput}`, `Bot: ${data}`]);
      });
  };


  return (
    <div>
      <h1>Chatbot</h1>
      <div id="chat-log">
        {chatLog.map((message: any, index: any) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="You:"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
