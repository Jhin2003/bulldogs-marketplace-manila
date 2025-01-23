
import "./card.scss"
import timeAgo from "../utils/timeAgo";
import { useNavigate } from "react-router-dom";

const Card = ({id, mainImage, name, price, user, createdAt}) => {
const navigate = useNavigate();

  const handleClick = () => {
    
    navigate(`/product/${id}`);
  };
    return (
      <div className="card" onClick={handleClick}>
        {mainImage && <div className="card-mainimage"> <img src={"http://localhost:3000" + mainImage} alt={name} /></div>}
        {name && <div className="card-name">{name}</div>}
        {price && <div className="card-price">{price}</div>}
        {user && <div className="card-userimage"><img src ={"http://localhost:3000" +user.image_url}></img></div>}
       {user && <div className="card-username">{user.username}</div>}
       {user && <div className="card-time-agp">{timeAgo(createdAt)}</div>}
      </div>
    );
  };


export default Card;