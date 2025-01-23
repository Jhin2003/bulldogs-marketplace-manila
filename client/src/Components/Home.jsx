import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Card from "./card";
import Grid from "./Grid";
import Catalog from "./Catalog";
import { Navigate, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useUser } from "../context/UserContext";
import CategoriesBar from "./CategoriesBar";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');  // Redirect to login if not logged in
    }
  }, [user, navigate]);

  const handleSearch = (query) => {
    setSearch(query);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div>Loading products...</div>;
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div>{error}</div>;
      </>
    );
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <CategoriesBar setSelectedCategory={setSelectedCategory}/>
      <Catalog products={products} search={search} selectedCategory = {selectedCategory} />
    </>
  );
};

export default Home;
