import { useEffect, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import "./App.css";

function App() {
  const messaeges = JSON.parse(localStorage.getItem("messages"));
  const [chatMessages, setChatMessages] = useState(messaeges || []);
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className="app-container">
      {chatMessages.length === 0 ? (
        <div className="welcome-message">
          <p>
            Welcome to the chatbot project! Send a message using a textbox
            below.
          </p>
        </div>
      ) : (
        <ChatMessages chatMessages={chatMessages} />
      )}

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
