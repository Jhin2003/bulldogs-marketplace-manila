import Header from "../Components/Header/Header";
import FlexLayout from "../Components/Layout/FlexLayout";
import ProductGallery from "../features/Product/components/ProductGallery";
import ProductDetails from "../features/Product/components/ProductDetail";
const ProductPage = () => {
  return (
    <>
      <Header />
      <FlexLayout gap={20}>

      <ProductGallery/>
      <ProductDetails/>
      </FlexLayout>
     
      
    </>
  );
};

export default ProductPage;
