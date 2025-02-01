import { useState } from "react";
import ProfileListings from "./ProfileListings";
import ProfileLikes from "./ProfileLikes";
import "./ProfileSectionSwitcher.scss"; // Import the CSS file

const ProfileSectionSwitcher = () => {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div>
      {/* Navigation */}
      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === "listings" ? "active" : ""}`}
          onClick={() => setActiveTab("listings")}
        >
          My Listings
        </button>
        <button
          className={`profile-tab ${activeTab === "likes" ? "active" : ""}`}
          onClick={() => setActiveTab("likes")}
        >
          Likes
        </button>
      </div>

      {/* Render the selected section */}
      {activeTab === "listings" ? <ProfileListings /> : <ProfileLikes />}
    </div>
  );
};

export default ProfileSectionSwitcher;
