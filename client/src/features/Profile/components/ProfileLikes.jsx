import useUserLikes from "../hooks/useUserLikes";
import { useUser } from "../../../context/UserContext";
import Grid from "../../../Components/Layout/Grid";
import Card from "../../../Components/Card";
import "./ProfileLikes.scss";
const ProfileLikes = () => {
  const { user } = useUser();

  const { likes, loading, error } = useUserLikes(user.id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="profile-likes-container">
      <Grid columns={6}>
        {likes.products.map((product) => (
          <Card
            key={product.id} // Ensure each product has a unique key
            product={product}
          />
        ))}
      </Grid>
    </div>
  );
};

export default ProfileLikes;
