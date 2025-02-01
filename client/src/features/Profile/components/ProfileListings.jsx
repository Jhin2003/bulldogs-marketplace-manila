import useUserProducts from "../hooks/useUserProducts";
import { useUser } from "../../../context/UserContext";
import Card from "../../../Components/Card"; // Assuming you have a ProductCard component
import Grid from "../../../Components/Layout/Grid";
//import "./ProfileListings.scss"; // Import SCSS for styling

const ProfileListings = () => {
  const { user } = useUser();

  // Fetch user's products
  const { products, loading, error } = useUserProducts(user.id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

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

export default ProfileListings;
