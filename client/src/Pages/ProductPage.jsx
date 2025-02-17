import Header from "../Components/Header/Header";
import FlexLayout from "../Components/Layout/FlexLayout";
import ProductGallery from "../features/Product/components/ProductGallery";
import ProductDetails from "../features/Product/components/ProductDetail";
import AboutSeller from "../features/Product/components/AboutSeller";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import useProduct from "../features/Product/hooks/useProduct";
import FlexRow from "../Components/Layout/FlexRow";
import "./ProductPage.scss"
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { user } = useUser();
  const { id } = useParams(); // Get the product ID from the URL
  const { product, loading, error } = useProduct(id);
  const [isOwner, setIsOwner] = useState(false);
 
  useEffect(() => {
    if (product && product.user_id && product.user_id === user.id) {
      setIsOwner(true); // If the logged-in user is the seller, set isOwner to true
    } 
    else(
      setIsOwner(false)
    )
  }, [product]); // Re-run this effect if product or user changes

  if (loading) {
    return <p>Loading...</p>; // Show loading while fetching
  }

  if (error) {
    return <p>Error fetching product.</p>; // Handle errors properly
  }

  return (
    <>
      <Header />
      <div className="product-container">
        <FlexLayout gap={20}>
          <ProductGallery images={product.ProductImages} />
          <FlexRow
            gap="20px"
            padding={{ top: "2rem", right: "0rem", bottom: "0rem", left: "0rem" }}
          >
            <ProductDetails product={product} />
            {/* Conditionally render AboutSeller only if user is not the owner */}
            {!isOwner && <AboutSeller seller={product.User} />}
          </FlexRow>
        </FlexLayout>
      </div>
    </>
  );
};

export default ProductPage;