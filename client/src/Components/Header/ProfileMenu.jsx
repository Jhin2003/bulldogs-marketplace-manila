import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./ProfileMenu.scss";

function ProfileMenu() {
  const { user,logout } = useUser();
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleViewProfile = () => {
    setIsPopupVisible(false);
    navigate(`/profile/${user.id}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsPopupVisible(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-menu">
      {/* Profile Icon and Name */}
      <div className="profile-menu-trigger" onClick={togglePopup}>
        <img
          src={`http://localhost:3000/images/userImages/default.svg`}
          alt="Profile"
          className="profile-menu-icon"
        />
        <p className="profile-menu-name">{user?.username}</p>
      </div>

      {/* Minimal Dropdown Menu */}
      {isPopupVisible && (
        <div className="profile-dropdown">
          <button onClick={handleViewProfile} className="dropdown-item">
            View Profile
          </button>
          <button onClick={handleLogout} className="dropdown-item logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;