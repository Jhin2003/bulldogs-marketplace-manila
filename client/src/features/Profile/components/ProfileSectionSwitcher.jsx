import { useState } from "react";
import ProfileListings from "./ProfileListings";
import ProfileLikes from "./ProfileLikes";
import "./ProfileSectionSwitcher.scss"; // Import the CSS file

const ProfileSectionSwitcher = ({isOwner, profile}) => {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div className="profile-section-switcher">
      {/* Navigation */}
      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === "listings" ? "active" : ""}`}
          onClick={() => setActiveTab("listings")}
        >
           Listings
        </button>
        {isOwner && (
          <button
            className={`profile-tab ${activeTab === "likes" ? "active" : ""}`}
            onClick={() => setActiveTab("likes")}
          >
            Likes
          </button>
        )}
      </div>

      {/* Render the selected section */}
    
      {activeTab === "listings" ? <ProfileListings profile={profile}  isOwner={isOwner}/> : isOwner && <ProfileLikes profile={profile} />}
    </div>
  );
};

export default ProfileSectionSwitcher;
