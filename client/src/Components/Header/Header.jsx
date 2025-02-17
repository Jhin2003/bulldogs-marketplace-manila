import { useState } from "react";
import SearchBar from "./SearchBar";
import "./Header.scss";
import CreateListing from "./CreateListing";
import Chat from "./Chat";
import ProfileMenu from "./ProfileMenu";
import FlexRow from "../Layout/FlexRow";

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <FlexRow>
       {/* Logo */}
      <div className="brand">
        <img src="/b.svg" alt="Brand Logo" />
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={onSearch} />

      {/* User Actions */}
      <div className="user-actions">
        <CreateListing />
        <Chat />
        <ProfileMenu />
      </div>

      </FlexRow>
      
    </header>
  );
};

export default Header;