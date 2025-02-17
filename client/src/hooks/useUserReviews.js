import { useState, useEffect } from "react";
import { getUserReviews } from "../service/api"; // Ensure getProducts is imported correctly

const useUserReviews = (id) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Return early if no id is provided
      if (!id) return;
  
      const fetchReviews = async () => {
        setLoading(true);
        try {
          // Make the GET request using axios
          const data = await getUserReviews(id);
          setReviews(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchReviews();
    }, [id]);
  
    return { reviews, loading, error };
  };
  
  export default useUserReviews;