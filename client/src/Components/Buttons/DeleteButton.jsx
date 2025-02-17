// src/components/DeleteButton.js
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteProduct } from '../../service/api';
import { useNavigate, useLocation } from 'react-router-dom';
import "./DeleteButton.scss"

const DeleteButton = ({userId, productId, onDelete}) => {
  
  const handleDelete =(e) =>{
    e.stopPropagation()
    onDelete(productId)
  }

  return (
    <button className='delete-button' onClick={handleDelete} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
      <FaTrash color="red" size={24} />
    </button>
  );
};

export default DeleteButton;