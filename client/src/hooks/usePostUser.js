import { useState } from 'react';
import { authenticateSignup } from '../service/api'; // Import your existing postUser API function

const usePostUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const postUserData = async (userData) => {
    setIsLoading(true);
    setError(null); // Reset error before each request

    try {
      const response = await authenticateSignup(userData); // Use the imported postUser function directly
      return response
    } catch (error) {
      setError(error.message);
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
    }
  };

  return { postUserData, setIsLoading, setError, success};
};

export default usePostUser;