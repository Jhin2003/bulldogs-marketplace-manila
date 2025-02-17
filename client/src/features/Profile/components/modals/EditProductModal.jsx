import React, { useState, useEffect } from "react";

import useProduct from "../../../Product/hooks/useProduct";
import useCategories from "../../../../hooks/useCategories";
import "./EditProductModal.scss";
const EditProductModal = ({ onClose, productId }) => {
  const { product, loading, error } = useProduct(productId);
  const { categories, error: categoryError } = useCategories();
  const [images, setImages] = useState([]);




  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    userId: "",
  });

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

  if (loading) {
    return <h1>loading</h1>;
  }

  const handleSubmit = (e) =>{
   e.preventDefault()
   
  }
  return (
    <>
      <div className="edit-product-modal-overlay">
        <div className="edit-product-modal-content">

        <form className="modal-form" onSubmit={handleSubmit}>
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
          <button type="submit">Submit</button>
          </form>

          <button>mark as sold</button>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;
