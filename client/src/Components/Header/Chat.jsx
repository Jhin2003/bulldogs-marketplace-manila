import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Chat.scss'; // Your CSS styles
import { useUser } from '../../context/UserContext';

const Chat = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const {user} = useUser()
  // Navigate to the chat page when button is clicked
  const navigateToChat = () => {
    navigate(`/chat/${user.id}`); // Replace '/chat' with the actual path for the chat page
  };

  return (
    <div className="messenger-container">
      {/* Button that navigates to the chat page */}
      <button className="chat-icon" onClick={navigateToChat}>
        💬
      </button>
    </div>
  );
};

export default Chat;