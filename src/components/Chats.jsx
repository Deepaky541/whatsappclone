import React from 'react'
import "./chats.css";

export const Chats = ({ name, photoURL }) => {
  return (
    <div className="chats">
    
      <img src={photoURL} alt="" />
      <div className="chat-text">
        <p>{name}</p>
      </div>
    </div>
  );
};
