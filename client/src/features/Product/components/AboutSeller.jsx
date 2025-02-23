import { useUser } from "../../../context/UserContext";
import timeAgo from "../../../utils/timeAgo";
import SellerReviews from "./SellerReviews";
import './AboutSeller.scss'
import { useState } from "react";

import { useNavigate } from "react-router-dom";


const AboutSeller = ({seller, createdAt}) =>{
const {user} = useUser();
const [isMessageClick, setIsMessageClick] = useState(false);
  const navigate = useNavigate();
  const handleCLick= (e) => {
     e.preventDefault()
     navigate(`/profile/${seller.id}`)
  }

  const handleMessageClick = (e) => {
    e.preventDefault()
    navigate(`/chat/${seller.id}`)
  }


    return(
        <div className= "about-seller-container">
         
         <div className="image-wrapper">
        <img src= {`http://localhost:3000${seller.image_url}` }alt="Example"></img>
          </div>
          <div className="seller-infomation-container">
          <h1 className="seller-name">{seller.username}</h1>
            <h2>{seller.email}</h2>
          </div>
          <button onClick={handleCLick}>View Seller Profile</button>
          <button onClick={handleMessageClick}>Message Seller</button>
         
        </div>
    )
}

export default AboutSeller