import React, { useState } from 'react';
import './SearchBar.scss'; // Import the styles
import { useSearch } from '../../context/SearchContext';

const SearchBar = ({ placeholder = 'Search...', onSearch }) => {
    const { searchQuery, handleSearch } = useSearch();

    const handleInputChange = (e) => {
        const value = e.target.value;
        handleSearch(value); // Update the global search query
      };
  

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;