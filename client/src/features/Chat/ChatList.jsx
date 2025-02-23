import React, { useState, useEffect} from "react";
import useMessages from "./useMessages";
import { useUser } from "../../context/UserContext";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import "./ChatList.scss"
const ChatList = ({ setSelectedUser}) => {
const {id} = useParams();
const {user} = useUser();
const { messages, messagesloading, error } = useMessages(user?.id);




if(messagesloading) return <div>loading</div>
if (error) return <div>{error}</div>;

 
   // Get unique chat partners
   const chatPartners = messages.reduce((acc, message) => {
    const partner = message.senderId === user.id ? message.Receiver : message.Sender;
    
    // Exclude yourself from the chat list
    if (partner.id !== user.id && !acc.some((user) => user.id === partner.id)) {
      acc.push(partner);
    }
    
    return acc;
  }, []);
  useEffect(() => {
    if (id) {
      const initialChatUser = chatPartners.find((partner) => partner.id === id);
      if (initialChatUser) {
        setSelectedUser(initialChatUser);
      }
    }
  }, [id, chatPartners, setSelectedUser])

 

  return (
    <div className="chatlist-container">
      <h2>Chats</h2>
     
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
   
    </div>
  );
};

export default ChatList;