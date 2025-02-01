import { useUser } from "../../../context/UserContext";

import "./ProfileDetails.scss"

const ProfileDetails = () => {
  const { user } = useUser();

  return (
    <div className="profile-details-container">
      <div className="profile-main-details-container">
        <img
          className="profile-detail-picture"
          src={`http://localhost:3000${user.image_url}`}
          alt="Profile"
        />
        <div className="profile-main-details-text">
          <h2 className="profile-detail-name">{user.username}</h2>
          <h2 className="profile-detail-email">{user.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;