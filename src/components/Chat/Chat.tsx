import { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [chatLog, setChatLog] = useState<string[]>([]);
  const chatLogRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    fetch('/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'user_input=' + encodeURIComponent(userInput),
    })
      .then(async (response) => await response.text())
      .then((data) => {
        setChatLog([...chatLog, `You: ${userInput}`, `Bot: ${data}`]);
      });
  };

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <div id="chat-container">
      <h1 id="chat-title">Chatbot</h1>
      <div id="chat-log" ref={chatLogRef}>
        {chatLog.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form
        id="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          setUserInput('');
          sendMessage();
        }}
      >
        <input
          id="user-input"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="You:"
        />
      </form>
    </div>
  );
};

export default Chat;
