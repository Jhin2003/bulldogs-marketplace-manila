import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import useProduct from '../../hooks/useProduct';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { product, loading, error } = useProduct(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Seller: {product.User.username} ({product.User.email})</p>
      <div>
        {product.ProductImage && product.ProductImage.length > 0 ? (
          product.ProductImage.map((img) => <img key={img.id} src={img.url} alt={product.name} />)
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;