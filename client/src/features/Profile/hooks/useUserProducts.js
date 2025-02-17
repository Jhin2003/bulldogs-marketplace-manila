import { useState, useEffect } from 'react';
import { getUserProducts } from '../../../service/api';

const useUserProducts = (id) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProducts(id);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Error fetching product');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [id]);
   
  const refresh = ()=>{
    fetchProducts()
  }
  return { products, loading, error, refresh };
};

export default useUserProducts;