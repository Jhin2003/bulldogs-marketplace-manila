import useUserProducts from "../hooks/useUserProducts";
import { useUser } from "../../../context/UserContext";
import { deleteProduct } from "../../../service/api";
import ProfileProductCard from "./ProfileProductCard";
import Grid from "../../../Components/Layout/Grid";
import FlexRow from "../../../Components/Layout/FlexRow";
import "./ProfileListings.scss"; // Import SCSS for styling

import EditProductModal from "./modals/EditProductModal";
import { useState } from "react";

const ProfileListings = ({ isOwner, profile }) => {
  const { user } = useUser();

  // Fetch user's products
  const { products, loading, error, refresh } = useUserProducts(profile.id);

  const [isEditProductModalOpen, setIsProductEditModalOpen] = useState(false);
  const [selectedEditProductId, setSelectedEditProductId] = useState(null)

 
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId); // Call API to delete
      refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  const handleEdit = async (productId) => {
    setSelectedEditProductId(productId);
    setIsProductEditModalOpen(true);
  }

  const handleProductModalClose = () => {
    setIsProductEditModalOpen(false)
    refresh();
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <>
    <div className="profile-listings-container">
      <Grid columns={6}>
        {products.map((product) => (
          <ProfileProductCard
            key={product.id} // Ensure each product has a unique key
            product={product}
            onDelete={handleDelete}
            onEdit={() => handleEdit(product.id)}
            isOwner={isOwner}
          />
        ))}
      </Grid>
     {isEditProductModalOpen && selectedEditProductId &&(
      <EditProductModal productId={selectedEditProductId} onClose={handleProductModalClose}/>
     )}
    </div>
    </>
  );
};

export default ProfileListings;
