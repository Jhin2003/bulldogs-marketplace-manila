import { useState } from "react";
import { addProduct } from "../service/api"; 

const useAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (productData, images) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await addProduct(productData, images.map((image) => image.file)); // Call the API service

      return data; // Return data from API response
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while creating the product.");
      return null; // Return null in case of error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProduct,
    isLoading,
    error,
  };
};

export default useAddProduct;