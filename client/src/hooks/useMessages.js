
import { useState, useEffect } from "react";
import { getMessages } from "../service/api"; // Import the API methods


const useMessages = (id) => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    // Fetch messages for the logged-in user
    const fetchMessages = async () => {
      try {
        console.log("tite")
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
    loading,
    error,
  };
};

export default useMessages;
