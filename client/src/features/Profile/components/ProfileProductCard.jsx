
import timeAgo from "../../../utils/timeAgo"
import { useNavigate } from "react-router-dom";
import LikeButton from "../../../Components/Buttons/LikeButton";
import EditProductButton from "../../../Components/Buttons/EditProductButton";
import DeleteButton from "../../../Components/Buttons/DeleteButton";
import { useUser } from "../../../context/UserContext"
import { useState } from "react";
import EditProductModal from "./modals/EditProductModal";
import "./profileProductCard.scss"


const ProfileProductCard = ({ product, onDelete, onEdit, isOwner = false }) => {
    const navigate = useNavigate();
    const { user } = useUser();

 
  
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
  {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(product.price)}
</div>
        <div className="card-username">{product.User.username}</div>
        <div className="card-time-agp">{timeAgo(product.createdAt)}</div>
        <div className="card-actions-container">
      
  
          {isOwner && (
            <>
              <EditProductButton
               userId={user.id} 
               productId={product.id} 
               onEdit ={onEdit} />
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
  
  export default ProfileProductCard;
  