import { useState } from "react";
import { updateProduct } from "../../../service/api";

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (productId, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedProduct = await updateProduct(productId, updatedData);
      setLoading(false);
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export default useUpdateProduct;
