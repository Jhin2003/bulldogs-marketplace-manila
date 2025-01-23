import React, { useEffect } from "react";
import useMessages from "../hooks/useMessages";  // Import the custom hook
import { useUser } from "../context/UserContext";  // UserContext to get the current user

const MessagesList = () => {
  const { user } = useUser();  // Access the user from context
  const { messages, loading, error } = useMessages(user.id);  // Pass user.id to the custom hook

  console.log(messages);

  // Handle loading and error states

  if (error) return <div>{error}</div>;

  // Render the list of messages if data is loaded
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message.id}>
              <strong>{message.Sender.username}</strong> to{" "}
              <strong>{message.Receiver.username}</strong>: {message.message}
            </li>
          ))
        ) : (
          <li>No messages to display</li>
        )}
      </ul>
    </div>
  );
};

export default MessagesList;