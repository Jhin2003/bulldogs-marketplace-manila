import React, { useState, useEffect } from "react";
import useCreateProduct from "../../hooks/useAddProduct";
import useCategories from "../../hooks/useCategories"; // Import the useCategories hook
import "./CreateListingModal.scss";

import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const CreateListingModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [images, setImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "", // Added categoryId to productData
    userId: user?.id || "", // Ensure userId is initialized correctly
  });

  const { createProduct, isLoading, error } = useCreateProduct(); // Use the custom hook
  const { categories, loading, error: categoryError } = useCategories(); // Use categories hook

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: file.name,
      src: URL.createObjectURL(file), // Preview the image
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!productData.categoryId || !productData.userId) {
        throw new Error("Category and User information are required.");
      }

      const data = await createProduct(productData, images);
      if (data) {
        // Success actions (e.g., close modal)
      
        navigate("/", { replace: true });
        console.log("narefresh")
        onClose();
       
      }
    } catch (err) {
      console.error("Error in form submission:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create a New Listing</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            required
          ></textarea>

          {/* Category select dropdown */}
          <select
            value={productData.categoryId}
            onChange={(e) => setProductData({ ...productData, categoryId: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {loading ? (
              <option value="" disabled>
                Loading categories...
              </option>
            ) : categoryError ? (
              <option value="" disabled>
                Error loading categories
              </option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>

          <input type="file" onChange={handleImageChange} accept="image/*" multiple />

          <div className="image-previews">
            {images.map(({ id, src }) => (
              <div key={id} className="image-preview">
                <img src={src} alt="Preview" />
                <button type="button" onClick={() => handleRemoveImage(id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Listing"}
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateListingModal;