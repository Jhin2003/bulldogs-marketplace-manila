import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import timeAgo from "../../utils/timeAgo";
import { sendMessage } from "../../service/api";
import useMessages from "./useMessages";
import styles from "./ChatBox.module.scss";
import { useParams } from "react-router-dom";

const ChatBox = ({ selectedUser, setSelectedUser }) => {
  const { user } = useUser();
  const { id } = useParams();
  const { messages } = useMessages(user?.id);
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState([]); // Local state for instant updates

  useEffect(() => {
    setLocalMessages(messages); // Sync with fetched messages
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return; // Prevent empty messages

    const tempMessage = {
      id: Date.now(), // Temporary unique ID
      senderId: user.id,
      receiverId: selectedUser.id,
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    setLocalMessages((prevMessages) => [...prevMessages, tempMessage]); // Optimistic UI update
    setNewMessage(""); // Clear input field

    try {
      await sendMessage(user.id, selectedUser.id, newMessage);
    } catch (error) {
      console.error("Message failed to send:", error);
      // Optionally: Remove the temporary message if sending fails
    }
  };

  const filteredMessages = localMessages.filter(
    (msg) =>
      (msg.senderId === user.id && msg.receiverId === selectedUser.id) ||
      (msg.senderId === selectedUser.id && msg.receiverId === user.id)
  );

  return (
    <div className={styles.chatContainer}>
      {/* Chat Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => setSelectedUser(null)}>
          &#8592; Back
        </button>
        <h2 className={styles.headerTitle}>Chat with {selectedUser.username}</h2>
      </div>

      {/* Chat Messages */}
      <div className={styles.messagesContainer}>
        {filteredMessages.map((msg) => (
          <div key={msg.id}>
            <div className={`${styles.messageBubble} ${msg.senderId === user.id ? styles.sent : styles.received}`}>
              <p className={styles.messageText}>{msg.message}</p>
            </div>
            <p className={styles.messageTimestamp}>{timeAgo(msg.createdAt)}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;