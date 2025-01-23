import { useState, useEffect } from 'react';
import { getProductById } from '../service/api';

const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export default useProduct;