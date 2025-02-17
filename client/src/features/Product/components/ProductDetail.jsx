//import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../Components/Header/Header';
import useProduct from '../hooks/useProduct';
import './ProductDetail.scss'


const ProductDetails = ({product}) => {


  return (
    <div className='product-detail-container'>
      
      <h1 className='product-name'>{product.name}</h1>
      
      <p className='product-price'> ${product.price}</p>
      <div className = 'product-description-wrapper'> 
       <h2>Description</h2>
       <p>{product.description}</p>
       
      </div>
      
    </div>
  );
};

export default ProductDetails;