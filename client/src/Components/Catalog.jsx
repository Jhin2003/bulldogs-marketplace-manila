import Card from "./Card";
import Grid from "./Layout/Grid";
import useProducts from "../hooks/useProducts";
import { deleteProduct } from "../service/api";
import { useEffect } from "react";
import FlexRow from "./Layout/FlexRow";
import { showAlert } from "./Alert";
import "./catalog.scss";
import { useUser } from "../context/UserContext";
import FlexLayout from "./Layout/FlexLayout";
const Catalog = ({ search, selectedCategory }) => {
  const { user } = useUser();

  const { products, loading, error, hasNextPage, loadMore, refresh } =
    useProducts(search, selectedCategory?.id);

  const scrollThreshold = 200; // Trigger load more if user scrolls within 200px of bottom

  useEffect(() => {
    // Function to handle scroll
    const handleScroll = () => {
      // Get the total scrollable height and the scroll position
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // If user scrolls within the threshold from the bottom
      if (documentHeight - scrollPosition <= scrollThreshold) {
        if (!loading && hasNextPage) {
          loadMore(); // Trigger load more
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasNextPage, loadMore]); // Re-run effe
  if (error) {
    return <div>Error: {error}</div>; // Display an error message if fetching failed
  }


  const handleEdit = async (productId) => {
    try {
      await deleteProduct(productId); // Call API to delete
      showAlert("Product deleted successfully!", "success"); //
      refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) => product.User.id !== user.id
  ); // Exclude user's products

  return (
    <div className="catalog-container">
    
      <FlexLayout>
      {search?.trim() && (
          <div className="search-results-wrapper">
            Found {filteredProducts.length} results for "{search}"
          </div>
        )}
        <Grid columns={6}>
          {filteredProducts // Exclude user's products
            .map((product) => (
              <Card
                key={product.id}
                product={product}
                onDelete={product.User.id === user.id ? handleDelete : null} // Allow delete only if user owns the product
                onEdit={product.User.id === user.id ? "" : ""} // Pass permission to Card component
              />
            ))}
        </Grid>
      </FlexLayout>
    </div>
  );
};

export default Catalog;
