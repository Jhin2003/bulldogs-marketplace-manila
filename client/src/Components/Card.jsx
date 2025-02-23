import "./card.scss";
import timeAgo from "../utils/timeAgo";
import { useNavigate } from "react-router-dom";
import LikeButton from "./Buttons/LikeButton";
import EditProductButton from "./Buttons/EditProductButton";
import DeleteButton from "./Buttons/DeleteButton";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import useProductLikes from "../hooks/useProductLikes";

const Card = ({ product, onDelete, onEdit, isOwner = false }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const likes = useProductLikes(product.id);

  const [isProductEditModalOpen, setIsProductEditModalOpen] = useState(false);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-main-image">
        <img
          src={`http://localhost:3000${product.ProductImages[0]?.image_url}`}
          alt="Product"
        />
      </div>
      <div className="card-name">{product.name}</div>
      <div className="card-price">
        {new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(product.price)}
      </div>
      <div className="card-username">{product.User.username}</div>
      <div className="card-time-agp">{timeAgo(product.createdAt)}</div>
      <div className="card-actions-container">
        <p>{likes}</p>
        <LikeButton userId={user.id} productId={product.id} />

        {isOwner && (
          <>
            <EditProductButton
              userId={user.id}
              productId={product.id}
              onClick={() => setIsProductEditModalOpen(true)}
            />
            <DeleteButton
              userId={user.id}
              productId={product.id}
              onDelete={onDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
