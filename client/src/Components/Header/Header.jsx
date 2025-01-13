import { useState } from "react";
import SearchBar from "./SearchBar";
import "./Header.scss"


const Header = ( onSearch) => {
    return(
        <div className="header">
            <div className = "brand-div">
            
            </div>
            <SearchBar  onSearch={onSearch}/>
        </div>
    )

    
}


export default Header;