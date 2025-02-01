import "./card.scss"
import timeAgo from "../utils/timeAgo"
import { useNavigate } from "react-router-dom";
import LikeButton from "./Buttons/LikeButton";
import { useUser } from "../context/UserContext";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-main-image">
        <img src={`http://localhost:3000${product.ProductImages[0]?.image_url}`} alt="Product" />
      </div>
      <div className="card-name">{product.name}</div>
      <div className="card-price">${product.price}</div>
      <div className="card-username">{product.User.username}</div>
      <div className="card-time-agp">{timeAgo(product.created_at)}</div>
      <div className="like-button-wrapper">
        <LikeButton userId={user.id} productId={product.id} />
      </div>
    </div>
  );
};

export default Card;