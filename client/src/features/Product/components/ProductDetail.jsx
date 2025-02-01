//import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../Components/Header/Header';
import useProduct from '../hooks/useProduct';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { product, loading, error } = useProduct(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      
      <h1>{product.name}</h1>
      
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p> {product.User.username} </p>
    </div>
  );
};

export default ProductDetails;