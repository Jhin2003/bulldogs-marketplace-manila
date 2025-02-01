import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductGallery.scss"; // Import styles
import { useUser } from "../../../context/UserContext";

const ProductGallery = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gallery-container">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={false} // Disable infinite loop
        autoplay={false} // Disable automatic sliding
        slidesPerView={3} // Show 3 images per slide
        spaceBetween={10} // Add spacing between images
        className="product-slider"
      >
        {product.ProductImages && product.ProductImages.length > 0 ? (
          product.ProductImages.map((image) => (
            <SwiperSlide key={image.id}>
              <img
                src={`http://localhost:3000${image.image_url}`}
                alt={`Product ${image.id}`}
                className="slider-image"
              />
            </SwiperSlide>
          ))
        ) : (
          <p>No images available</p>
        )}
        
      </Swiper>
    </div>
  );
};

export default ProductGallery;
