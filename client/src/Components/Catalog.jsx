import Card from "./Card";
import Grid from "./Layout/Grid";
import useProducts from "../hooks/useProducts";
import { useEffect } from "react";
const Catalog = ({ search, selectedCategory }) => {
  const { products, loading, error, hasNextPage, loadMore } = useProducts(
    search,
    selectedCategory?.id
  );

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

  return (
 
      <Grid columns={6}>
        {products.map((product) => (
          <Card
            key={product.id} // Ensure each product has a unique key
            product={product}
          />
        ))}
      </Grid>
 
  );
};

export default Catalog;
