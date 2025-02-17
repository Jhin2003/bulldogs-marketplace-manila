import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "./ProductGallery.scss"; // Import styles
import { useUser } from "../../../context/UserContext";
import FlexRow from "../../../Components/Layout/FlexRow";

const ProductGallery = ({images}) => {
 
  return (
    <div className="gallery-container">
    
        {images.map((image) => {
          return (
             < div  key={image.id} className="gallery-image-wrapper" >
              <img
                className="gallery-image"
                src={`http://localhost:3000${image.image_url}`}
              />
            </div>
          );
        })}
      
    </div>
  );
};

export default ProductGallery;
