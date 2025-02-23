import Header from "../Components/Header/Header";
import ChatList from "../features/Chat/ChatList";
import ChatBox from "../features/Chat/ChatBox";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../service/api";
import "./ChatPage.scss"
const ChatPage = () => {
const {user} = useUser()
const {id} = useParams();

const [newMessage, setNewMessage] = useState("hello")
const handleSend = async () => {
  await sendMessage(user.id, id, newMessage);
};

if(user && id && user.id !== id) {
  handleSend()
}
const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  return (
    <>
      <Header />
      <div className="chat-container">
      <ChatList  selectedUser = {selectedUser} setSelectedUser = {setSelectedUser}/>
      {selectedUser &&(
           <ChatBox selectedUser={selectedUser} setSelectedUser={setSelectedUser} messages={selectedUser.message}/>
      )}
      </div>
    </>
  );
};

export default ChatPage;
