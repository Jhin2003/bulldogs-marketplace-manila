import { useState, useEffect } from 'react';

import { getUserById } from '../../../service/api';

const useProfile = (id) => {
  const [profile,setProfile] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchUser = async () => {
  
    setLoading(true);
    setError(null);
    try {
      const data = await getUserById(id);
      setProfile(data);
    } catch (err) {
      setError(err.message || 'Error fetching product');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, [id]);
   
 
  return { profile, loading, error};
};

export default useProfile;