import React, { useState } from "react";
import Header from "../Components/Header/Header";


import FlexLayout from "../Components/Layout/FlexLayout";
import ProfileDetails from "../features/Profile/components/ProfileDetails";
import ProfileSectionSwitcher from "../features/Profile/components/ProfileSectionSwitcher";

//import { useNavigate } from "react-router-dom"; // Import the navigate hook for routing
//import "./ProfilePage.scss"; // Add your styles here


function ProfilePage() {


  return (
    <>
      <Header />

      <FlexLayout gap={20}>
        <ProfileDetails />
        <ProfileSectionSwitcher />
      </FlexLayout>
    </>
  );
}

export default ProfilePage;
