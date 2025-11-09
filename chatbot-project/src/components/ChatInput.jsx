import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingSpinner from "../assets/loading-spinner.gif";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText === "") {
      return;
    }
    if (!loading) {
      setLoading(true);
      const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: "user",
          id: crypto.randomUUID(),
        },
      ];
      setChatMessages(newChatMessages);
      setChatMessages([
        ...newChatMessages,
        {
          message: (
            <img src={LoadingSpinner} alt="" className="loading-image" />
          ),
          sender: "robot",
          id: crypto.randomUUID(),
        },
      ]);

      setInputText("");

      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: "robot",
          id: crypto.randomUUID(),
        },
      ]);
      setLoading(false);
    }
  }

  function sendMessageOnEnter(event) {
    if (event.key === "Escape") {
      setInputText("");
    }

    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={sendMessageOnEnter}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}
