import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the navigate hook for routing
import "./ProfileMenu.scss"; // Add your styles here
import { useUser } from "../../context/UserContext";

function ProfileMenu() {
    const {logout} = useUser()
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const navigate = useNavigate(); // To navigate between pages

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleViewProfile = () => {
        
        
        setIsPopupVisible(false); // Close the popup after selecting
    };

    const handleLogout = () => {
        // Handle logout logic here (e.g., clear user data, token, etc.)
        console.log("Logging out...");
        logout()
        navigate("/login"); // Navigate to the login page after logout
        setIsPopupVisible(false); // Close the popup after logout
    };

    return (
        <div className="profile-container">
            {/* Profile Icon */}
            <div className="profile-icon" onClick={togglePopup}>
                <img
                    src="https://via.placeholder.com/50" // Replace with your profile icon
                    alt="Profile"
                    className="icon"
                />
            </div>

            {/* Popup with actions */}
            {isPopupVisible && (
                <div className="profile-popup">
                    <div className="popup-content">
                        <button onClick={handleViewProfile}>View Profile</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            )}
        </div>
        
    );
}

export default ProfileMenu;