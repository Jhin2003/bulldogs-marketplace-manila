import React, { useState } from 'react';
import './Chat.scss'; // Your CSS styles
import MessagesList from '../MessagesList';


const Chat = () => {
 
  const [chatVisible, setChatVisible] = useState(false);

  // Toggle chat visibility
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <div className="messenger-container">
 
      <button className="chat-icon" onClick={toggleChat}>
        💬
      </button>

      {/* Chat dialog */}
      {chatVisible && (
        <div className="chat-dialog">
          <div className="chat-header">
            <h3>Chat</h3>
            <button onClick={toggleChat} className="close-btn">X</button>
          </div>
          <div className="chat-body">
            < MessagesList  />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;