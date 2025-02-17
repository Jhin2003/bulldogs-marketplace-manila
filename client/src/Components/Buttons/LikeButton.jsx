// src/components/LikeButton.js
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useLikeProduct from '../../hooks/useLikeProduct';

import "./LikeButton.scss"

const LikeButton = ({ userId, productId }) => {

  const { liked, isLoading, error, handleLike } = useLikeProduct(userId, productId);

  const handleClick = (e) => {
    e.stopPropagation()
    handleLike();
    
  };

  return (
       <button className='like-button' onClick={handleClick} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        {liked ? <FaHeart color="red" size={24} /> : <FaRegHeart color="gray" size={30} />}
      </button>
  );
};

export default LikeButton;