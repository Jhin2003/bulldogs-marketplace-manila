import { useState } from "react";
import SearchBar from "./SearchBar";
import "./Header.scss"
import CreateListing from "./CreateListing";
import Chat from "./chat";
import ProfileMenu from "./ProfileMenu";

const Header = ({onSearch}) => {
    
    const handleSearch = (query) => {
        if (onSearch) {
            onSearch(query); // Passes to the parent `Home` component.
        }
    };

    return(
        <div className="header">

            <div className = "brand-div">
            <img src="./brandLogo.svg"></img>
            </div>
            <SearchBar onSearch={handleSearch} />
            <div className="user-actions-div">
              <CreateListing />
              <Chat />
              <ProfileMenu />
            </div>
        </div>
    )

    
}


export default Header;