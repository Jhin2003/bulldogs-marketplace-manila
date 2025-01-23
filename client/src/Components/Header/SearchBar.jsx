import React, { useState, useEffect} from 'react';
import './SearchBar.scss'; // Import the styles
import { useSearch } from '../../context/SearchContext';

const SearchBar = ({onSearch}) => {
    
    const [ searchQuery, setSearchQuery ] = useState('');
   
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
      };

      const handleClick = (e) =>{
  
        setSearchQuery(e.target.value);
        console.log("tite")
        
      }

      useEffect(() => {
        const timeoutId = setTimeout(() => {
          onSearch(searchQuery); // Send the final query after a delay
        }, 500); // Debounce for 500ms
    
        return () => clearTimeout(timeoutId); // Clean up the timeout if input changes
      }, [searchQuery]); // Onl
   
     
  

  return (
    <>
        <form className="search-bar" onSubmit={handleClick}>
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={"Seach"}
      />
      <button></button>
 </form>
    </>
  );
};

export default SearchBar;