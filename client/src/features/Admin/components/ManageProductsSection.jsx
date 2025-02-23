import { useState, useEffect } from "react";
import useProducts from "../../../hooks/useProducts";
import "./ManageProductsSection.scss";
import { updateProduct, deleteProduct } from "../../../service/api";
import EditModal from "./EditModal";

const ManageProductsSection = () => {
  const { products: initialProducts, loading, error } = useProducts();
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="manage-products-section">
      <h2>Manage Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Seller</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₱{parseFloat(product.price).toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</td>
              <td>{product.Category?.name || "N/A"}</td>
              <td>{product.User?.email || "N/A"}</td>
              <td>
                <button className="edit-btn" onClick={() => setSelectedProduct(product)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <EditModal
          title="Edit Product"
          data={selectedProduct}
          fields={[
            { name: "name", label: "Name" },
            { name: "price", label: "Price", type: "number" },
            { name: "category_id", label: "Category ID", type: "number" },
          ]}
          onSave={handleSave}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ManageProductsSection;