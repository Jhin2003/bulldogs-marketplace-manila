import { useState, useEffect } from "react";
import Header from "./Header/Header";

import Catalog from "./Catalog";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import CategoriesBar from "./CategoriesBar";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useUser();



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

 

  return (
    <>
      <Header onSearch={handleSearch} />
      <CategoriesBar setSelectedCategory={setSelectedCategory}/>
      <Catalog  search={search} selectedCategory = {selectedCategory} />
    </>
  );
};

export default Home;
