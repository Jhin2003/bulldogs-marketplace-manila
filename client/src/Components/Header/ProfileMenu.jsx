import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the navigate hook for routing

import { useUser } from "../../context/UserContext";
import "./ProfileMenu.scss";

function ProfileMenu() {
  const { user } = useUser();
  const { logout } = useUser();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate(); // To navigate between pages

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleViewProfile = () => {
    setIsPopupVisible(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    // Handle logout logic here (e.g., clear user data, token, etc.)
    console.log("Logging out...");
    setIsPopupVisible(false);
    logout();
    navigate("/login"); // Navigate to the login page after logout
    // Close the popup after logout
  };

  return (
    <div className="profile-menu">
  {/* Profile Icon */}
  <div className="profile-menu-icon" onClick={togglePopup}>
    <img
      src={`http://localhost:3000/images/userImages/default.svg`} // Replace with your profile icon
      className="profile-menu-icon-image"
    />
  </div>
  <div className="profile-menu-name" onClick={togglePopup}>
    <p>{user?.username}</p>
  </div>

  {/* Popup with actions */}
  {isPopupVisible && (
    <div className="profile-menu-popup">
      <div className="profile-menu-popup-content">
        <button
          onClick={handleViewProfile}
          className="profile-menu-popup-item"
        >
          View Profile
        </button>
        <button onClick={handleLogout} className="profile-menu-popup-item">
          Logout
        </button>
      </div>
    </div>
  )}
</div>
  );
}

export default ProfileMenu;
