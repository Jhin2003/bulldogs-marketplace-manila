import { useState, useEffect } from 'react';
import { getUserReviews } from '../../../service/api';

const useUserReviews = (id) => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserReviews(id);
        setReviews(data);
      } catch (err) {
        setError(err.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  return { reviews, loading, error };
};

export default useUserReviews;