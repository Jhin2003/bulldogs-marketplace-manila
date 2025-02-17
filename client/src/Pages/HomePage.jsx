import { useState, useEffect, useCallback } from "react";
import Header from "../Components/Header/Header";

import Catalog from "../Components/Catalog";
import { useNavigate, useLocation } from "react-router-dom";

import { useUser } from "../context/UserContext";
import CategoriesBar from "../Components/CategoriesBar";
import "./HomePage.scss"
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useUser();



  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');  // Redirect to login if not logged in
    }
  }, [user, isLoading, navigate, location.pathname]);




  useEffect(() => {
    if (location.state?.searchQuery) {
     
      handleSearch(location.state.searchQuery); // Trigger search when redirected
      console.log(location.state.searchQuery)
    }
  }, [location.state]);


 
  const handleSearch = useCallback((query) => {
    setSearch(query);
  }, []);


  if (isLoading) {
    return null; 
  }

  return (
    <>
    
    <div className="home-container">
      <Header onSearch={handleSearch} />
      <CategoriesBar setSelectedCategory={setSelectedCategory}/>
      <Catalog  search={search} selectedCategory = {selectedCategory} />
      </div>
    </>
  );
};

export default Home;
