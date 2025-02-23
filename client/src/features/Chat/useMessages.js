
import { useState, useEffect } from "react";
import { getMessages } from "../../service/api"; // Import the API methods


const useMessages = (id) => {

  const [messages, setMessages] = useState([]);
  const [messagesLoading, setLoading] = useState(true);
  const [messagesError, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    // Fetch messages for the logged-in user
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedMessages = await getMessages(id) // Pass user ID to API
        setMessages(fetchedMessages);
      } catch (error) {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []); // Re-run the effect when the user changes

  return {
    messages,
    messagesLoading,
    messagesError,
  };
};

export default useMessages;
