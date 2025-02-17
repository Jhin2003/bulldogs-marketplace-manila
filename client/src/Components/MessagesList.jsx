import React, { useState } from "react";
import useMessages from "../hooks/useMessages";
import { useUser } from "../context/UserContext";
import ChatBox from "./ChatBox";

const MessagesList = () => {
  const { user } = useUser();
  const { messages, error } = useMessages(user.id);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user

  if (error) return <div>{error}</div>;

   // Get unique chat partners
   const chatPartners = messages.reduce((acc, message) => {
    const partner = message.senderId === user.id ? message.Receiver : message.Sender;
    if (!acc.some((user) => user.id === partner.id)) {
      acc.push(partner);
    }
    return acc;
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      {selectedUser ? (
        <ChatBox selectedUser={selectedUser} setSelectedUser={setSelectedUser} messages={messages} />
      ) : (
        <ul>
          {chatPartners.length > 0 ? (
            chatPartners.map((chatPartner) => (
              <li key={chatPartner.id} onClick={() => setSelectedUser(chatPartner)}>
                <strong>{chatPartner.username}</strong>
              </li>
            ))
          ) : (
            <li>No messages to display</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MessagesList;