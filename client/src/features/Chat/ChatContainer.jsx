import React, { useState } from "react";
import MessagesList from "./MessagesList";
import ChatBox from "./ChatBox";

const ChatContainer = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={styles.container}>
      {/* Left Column: Conversations List */}
      <div style={styles.listColumn}>
        <MessagesList onSelectUser={setSelectedUser} />
      </div>
      
      {/* Right Column: Chat Box */}
      <div style={styles.chatColumn}>
        {selectedUser ? (
          <ChatBox selectedUser={selectedUser} />
        ) : (
          <div style={styles.emptyChat}>
            <p>Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh"
  },
  listColumn: {
    width: "30%",
    borderRight: "1px solid #ccc",
    overflowY: "auto"
  },
  chatColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  emptyChat: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#888"
  }
};

export default ChatContainer;