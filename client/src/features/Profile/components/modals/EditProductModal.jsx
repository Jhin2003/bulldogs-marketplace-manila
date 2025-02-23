import React, { useState, useEffect } from "react";
import useProduct from "../../../Product/hooks/useProduct";
import useCategories from "../../../../hooks/useCategories";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import "./EditProductModal.scss";
import useMessages from "../../../Chat/useMessages";
import { useUser } from "../../../../context/UserContext";
import { addTransaction } from "../../../../service/api";
import { showAlert } from "../../../../Components/Alert";

const EditProductModal = ({ onClose, productId }) => {
  const { user } = useUser();
  const { product, loading, error } = useProduct(productId);
  const { categories, error: categoryError } = useCategories();
  const {
    update,
    loading: updateLoading,
    error: updateError,
  } = useUpdateProduct();
  const { messages, messagesLoading, messagesError } = useMessages(user.id);

  const [images, setImages] = useState([]);
  const [isSold, setIsSold] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });

  const handleSold = () => {
    setIsSold(true);
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    const response = await addTransaction(user.id, selectedBuyer.id, productId);
    if (response) {
      showAlert("Product Sold! You can create new listings", "success"); //
      onClose()

    }
    // Handle response if needed...
  };



  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        categoryId: product.categoryId || "",
      });
      setImages(product.ProductImages || []);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await update(productId, productData);
    if (updated) {
      alert("Product updated successfully!");
      onClose();
    }
  };

  if (loading) {
    return <h1 className="loading-text">Loading...</h1>;
  }

  if (messagesLoading) {
    return <h1 className="loading-text">Loading...</h1>;
  }
  
  const chatPartners = messages.reduce((acc, message) => {
    const partner =
      message.senderId === user.id ? message.Receiver : message.Sender;
    if (!acc.some((user) => user.id === partner.id)) {
      acc.push(partner);
    }
    return acc;
  }, []);

  return (
    <div className="edit-product-modal-overlay">
      <div className="edit-product-modal-content">
        {!isSold && (
          <>
            <h2>Edit Product</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
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
              </div>

              <div className="form-group">
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
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="Description"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={productData.categoryId}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      categoryId: e.target.value,
                    })
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
              </div>

              {/* Buttons */}
              <div className="button-group">
                <button type="submit" disabled={updateLoading}>
                  {updateLoading ? "Updating..." : "Update Product"}
                </button>
                <button
                  type="button"
                  className="mark-sold-button"
                  onClick={handleSold}
                >
                  Mark as Sold
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>

              {updateError && <p className="error-message">{updateError}</p>}
            </form>
          </>
        )}
        {isSold && (
          <>
            <h1>Sold To</h1>
            <div className="buyers-list">
              {chatPartners.map((partner) => (
                <div
                  key={partner.id}
                  className={`buyer-item ${
                    selectedBuyer?.id === partner.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedBuyer(partner)}
                >
                  {partner.username}
                </div>
              ))}
            </div>
            <div className="button-group">
              <button
                type="button"
                className="back-button"
                onClick={() => setIsSold(false)}
              >
                Back
              </button>
              {selectedBuyer && (
                <button className="confirm-button" onClick={handleTransaction}>
                  Confirm
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProductModal;