import { useState, useEffect } from 'react';
import { getUserLikes } from '../../../service/api';

const useUserLikes = (id) => {
  const [likes, setLikes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchLikes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserLikes(id);
        setLikes(data);
      } catch (err) {
        setError(err.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [id]);

  return { likes, loading, error };
};

export default useUserLikes;