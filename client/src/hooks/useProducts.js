import { useState, useEffect } from "react";
import { getProducts } from "../service/api"; // Ensure getProducts is imported correctly

const useProducts = (search, categoryId) => {
  const [products, setProducts] = useState([]); // To store fetched products
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To store any error
  const [page, setPage] = useState(1); // To track the current page
  const [hasNextPage, setHasNextPage] = useState(true); // To track if more pages are available

  // Function to fetch products
  const fetchProducts = async (page, search, categoryId) => {
    setLoading(true); // Start loading before fetching products
    
    try {
      const response = await getProducts({ page, search, categoryId });
      const fetchedProducts = response.data;

      // If no more products are returned, set hasNextPage to false
      if (fetchedProducts.length < 10) {
        setHasNextPage(false); // If less than 10, we assume there's no next page
      }

      // If it's the first page or the search/category changes, reset the products array
      setProducts((prevProducts) => {
        if (page === 1) {
          return fetchedProducts; // Reset products for the first page or after search/category changes
        }
        return [...prevProducts, ...fetchedProducts]; // Concatenate new products for subsequent pages
      });
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false); // Stop loading after fetch is complete
    }
  };

  // Fetch the initial products when search or category changes
  useEffect(() => {
    setPage(1); // Reset to page 1 when search or category changes
    setHasNextPage(true); // Reset hasNextPage when search or category changes
  }, [search, categoryId]); // This effect runs whenever search or categoryId changes

  // Fetch products whenever the page state changes
  useEffect(() => {
    fetchProducts(page, search, categoryId); // Fetch products for the current page
  }, [page, search, categoryId]); // This effect runs whenever page, search, or categoryId changes

  // Function to load more products when the user clicks the "Load More" button
  const loadMore = () => {
    if (!loading && hasNextPage) {
      setPage((prevPage) => prevPage + 1); // Increment page when loading more products
    }
  };

  return {
    products,
    loading,
    error,
    hasNextPage,
    loadMore,
  };
};

export default useProducts;