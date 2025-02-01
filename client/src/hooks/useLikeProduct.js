import { useState, useEffect } from 'react';
import {  getLikeStatus, likeProduct , unlikeProduct} from '../service/api';

const useLikeProduct = (userId, productId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
  
    useEffect(() => {
      const fetchLikeStatus = async () => {
        try {
          const data = await getLikeStatus(userId, productId);
         
          setLiked(data.liked); // Assuming the response is { liked: true/false }
        } catch (err) {
          console.error('Error fetching like status:', err);
        }
      };
        fetchLikeStatus();
    }, [userId, productId]); // Include dependencies
  
    const handleLike = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        if (!liked) {
          await likeProduct(userId, productId); // Like product
          console.log("liked")
          setLiked(true);
        } else {
          await unlikeProduct(userId, productId); // Unlike product
          setLiked(false);
        }
      } catch (error) {
        setError('Failed to update like status');
      } finally {
        setIsLoading(false);
      }
    };

  
    return { liked, isLoading, error, handleLike };
 
};

export default useLikeProduct;