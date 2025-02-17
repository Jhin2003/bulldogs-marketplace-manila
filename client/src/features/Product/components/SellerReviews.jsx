import useUserReviews from "../../../hooks/useUserReviews";

const SellerReviews = ({ user }) => {
  const { reviews, loading, error } = useUserReviews(user.id);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{`Reviews for ${user.username}`}</h1>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          
        </ul>
      )}
    </div>
  );
};

export default SellerReviews;