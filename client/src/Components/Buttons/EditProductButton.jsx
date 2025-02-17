import React from 'react';
import { FaEdit } from 'react-icons/fa';
import "./EditProductButton.scss"

const EditProductButton = ({ productId, onEdit }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(productId); // Calls parent function
  };

  return (
    <button className="edit-product-button" onClick={handleEdit} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
      <FaEdit color="blue" size={30} />
    </button>
  );
};

export default EditProductButton;