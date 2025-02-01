// src/components/LikeButton.js
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useLikeProduct from '../../hooks/useLikeProduct';


const LikeButton = ({ userId, productId }) => {

  const { liked, isLoading, error, handleLike } = useLikeProduct(userId, productId);

  const handleClick = (e) => {
    e.stopPropagation()
    handleLike();
    
  };

  return (
    <div>
       <button onClick={handleClick} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        {liked ? <FaHeart color="red" size={30} /> : <FaRegHeart color="gray" size={30} />}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LikeButton;