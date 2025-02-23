import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";

import FlexLayout from "../Components/Layout/FlexLayout";
import ProfileDetails from "../features/Profile/components/ProfileDetails";
import ProfileSectionSwitcher from "../features/Profile/components/ProfileSectionSwitcher";
import "./ProfilePage.scss";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";

import useProfile from "../features/Profile/hooks/useProfile";

function ProfilePage() {
  const { id } = useParams();
  const { user } = useUser();
  const { profile, loading, error } = useProfile(id);
 

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (profile && user) {
    
      setIsOwner(profile.id === user.id);
    }
  }, [profile, user]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="profile-container">
        <Header />

        <FlexLayout gap={20}>
          <ProfileDetails isOwner={isOwner} profile={profile} />
          <ProfileSectionSwitcher isOwner={isOwner} profile={profile} />
        </FlexLayout>
      </div>
    </>
  );
}

export default ProfilePage;
