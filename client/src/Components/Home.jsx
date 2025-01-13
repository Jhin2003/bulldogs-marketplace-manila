import { useState } from "react";
import Header from "./Header/Header";
import Card from "./card";
import Grid from "./Grid";

import useProducts from "../hooks/getProducts";

import { useSearch } from '../context/SearchContext';


const Home = () => {
  const { products, loading, error } = useProducts();
  

  const { searchQuery } = useSearch();

  if (loading) {
    return (
      <>
        <Header />
        <div>Loading products...</div>;
      </>
    ); // Show loading message while fetching data
  }

  if (error) {
    return (
      <>
        <Header />
        <div>{error}</div>;
      </>
    ); // Show error message if fetching products fails
  }
  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <Header />
      <Grid columns={4}>
        {filteredProducts.map((product) => (
          <Card key={product.id} mainImage = {product.ProductImages[0].image_url} name={product.name} price = {product.price}></Card>
        ))}
      </Grid>
    </>
  );
};

export default Home;
