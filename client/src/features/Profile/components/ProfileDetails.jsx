import { useState } from "react";
import EditProfileModal from "./modals/EditProfileModal";
import "./ProfileDetails.scss";

const ProfileDetails = ({ isOwner, profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(profile); // Store profile locally

  // Function to update the profile details after editing
  const refreshProfile = (updatedProfile) => {
    setProfileData(updatedProfile); // Update local state
  };

  return (
    <div className="profile-details-container">
      <div className="profile-main-details-container">
        <div className="profile-detail-picture-wrapper">
          <img
            className="profile-detail-picture"
            src={`http://localhost:3000${profileData.image_url}`}
            alt="Profile"
          />
        </div>

        <div className="profile-main-details-text">
          <p className="profile-detail-name">{profileData.username}</p>
          <p className="profile-detail-email">{profileData.email}</p>
          {isOwner && (
            <button className="edit-profile-btn" onClick={() => setIsModalOpen(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal
          onClose={() => setIsModalOpen(false)}
          refreshProfile={refreshProfile} // Pass function to modal
        />
      )}
    </div>
  );
};

export default ProfileDetails;