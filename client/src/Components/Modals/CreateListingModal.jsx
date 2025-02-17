import React, { useState } from "react";
import useCreateProduct from "../../hooks/useAddProduct";
import useCategories from "../../hooks/useCategories"; // Import the useCategories hook
import "./CreateListingModal.scss";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Alert, { showAlert } from "../Alert";

const CreateListingModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [images, setImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    userId: user?.id || "",
  });

  const { createProduct, isLoading, error } = useCreateProduct();
  const { categories, loading, error: categoryError } = useCategories();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: file.name,
      src: URL.createObjectURL(file),
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
      if (images.length === 0) {
        showAlert("Please upload at least one image.", "error");
        throw new Error("Category and User information are required.")
      }
      if (!productData.categoryId || !productData.userId) {
        showAlert("Category and User information are required.", "error");
        throw new Error("Category and User information are required.");
      }
      const data = await createProduct(productData, images);
      if (data) {
        showAlert("Listed successfully!", "success");
        setProductData({
          name: "",
          price: "",
          description: "",
          categoryId: "",
          userId: user?.id || "", // Keep userId unchanged
        });
        setImages([])
      }
    } catch (err) {
      console.error("Error in form submission:", err);
    }
  };

  const handleCancel = () => {
    // Close the modal by calling onClose when the Cancel button is clicked
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create a New Listing</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="image-upload">Upload Images</label>

          <div className="image-previews">
            {images.map(({ id, src }) => (
              <>
              <div key={id} className="image-preview">
                <img src={src} alt="Preview" />
              </div>
              <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveImage(id)}
            >
            </button>
            </>
            ))}
          </div>

          <input
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
            multiple
          />

          <label htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            placeholder="Product Name"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            required
          />

          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            required
          ></textarea>

          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={productData.categoryId}
            onChange={(e) =>
              setProductData({ ...productData, categoryId: e.target.value })
            }
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

          {error && <p className="error-message">{error}</p>}

          <div className="actions-div">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Listing"}
            </button>

            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingModal;
