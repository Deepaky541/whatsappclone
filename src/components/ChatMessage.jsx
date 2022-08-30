import React from "react";

import "./ChatMessage.css";
function ChatMessage({ message, time, sender }) {
   var obj = JSON.parse(localStorage.getItem("user"));
  return (
    <div
      className="chat-message"
      style={{
        left: sender !== obj.email ? 0 : 800,

        backgroundColor: sender == obj.email ? "#dcf8c6" : "#fff",
      }}
    >
      <div className="chat-message-text">
        <p>{message}</p>
      </div>
      <div className="chat-message-date">
        <p>{new Date(time.toDate()).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
