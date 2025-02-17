import React, { useState } from "react";
import { Search } from "lucide-react"; // Import search icon
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchBar.scss"; // Import styles

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form reload

    if (location.pathname !== "/") {
      // Navigate to home with search state if not already on home
      navigate("/", { state: { searchQuery } });
    } else {
      onSearch(searchQuery);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit" className="search-button">
        <Search size={18} strokeWidth={2} />
      </button>
    </form>
  );
};

export default SearchBar;