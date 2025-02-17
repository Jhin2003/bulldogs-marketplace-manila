import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import timeAgo from "..//utils/timeAgo"
import {sendMessage} from "../service/api"

const ChatBox = ({ selectedUser, setSelectedUser, messages, setMessages }) => {
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState("");

  // Send a new message
  
  const handleSend = async (e) => {
    e.preventDefault()
    
    const data = await sendMessage(user.id, selectedUser.id, newMessage)

  }

  // Filter messages between the logged-in user and the selected user
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === user.id && msg.receiverId === selectedUser.id) ||
      (msg.senderId === selectedUser.id && msg.receiverId === user.id)
  );

  return (
    <div style={styles.chatContainer}>
      {/* Chat Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => setSelectedUser(null)}>
          &#8592; Back
        </button>
        <h2 style={styles.headerTitle}>Chat with {selectedUser.username}</h2>
      </div>

      {/* Chat Messages */}
      <div style={styles.messagesContainer}>
        {filteredMessages.map((msg) => (
          <>
          <div
            key={msg.id}
            style={{
              ...styles.messageBubble,
              ...(msg.senderId === user.id
                ? styles.sentMessage
                : styles.receivedMessage),
            }}
          >
            <p style={styles.messageText}>{msg.message}</p>
          
          </div>
            <p style={styles.messageTimestamp}>{timeAgo(msg.createdAt)}</p>
            </>
        ))}
      </div>

      {/* Chat Input */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    height: "80vh",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: "20px auto",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    border: "none",
    background: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginRight: "10px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    backgroundColor: "#e5ddd5",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    clear: "both",
  },
  sentMessage: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  receivedMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    marginRight: "auto",
  },
  messageText: {
    margin: 0,
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #eee",
    padding: "10px",
    backgroundColor: "#f5f5f5",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "20px",
    outline: "none",
  },
  sendButton: {
    marginLeft: "10px",
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    cursor: "pointer",
  },
};

export default ChatBox;