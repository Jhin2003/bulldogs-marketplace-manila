import { useUser } from "../../../context/UserContext";
import { useState } from "react";
import EditProfileModal from "./modals/EditProfileModal";
import "./ProfileDetails.scss"

const ProfileDetails = ({isOwner, profile}) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="profile-details-container">
      <div className="profile-main-details-container">
        <img
          className="profile-detail-picture"
          src={`http://localhost:3000${profile.image_url}`}
          alt="Profile"
        />
        <div className="profile-main-details-text">
          <p className="profile-detail-name">{profile.username}</p>
          <p className="profile-detail-email">{profile.email}</p>
          {isOwner && (
          <button className="edit-profile-btn" onClick={() => setIsModalOpen(true)}>Edit Profile</button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal
          onClose={() => setIsModalOpen(false)}
        
        />
      )}
      
    </div>
  );
};

export default ProfileDetails;