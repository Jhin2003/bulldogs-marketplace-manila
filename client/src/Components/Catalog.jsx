import Card from "./card";
import Grid from "./Grid";

const Catalog = ({ products, search, selectedCategory }) => {
  const filteredProducts = products.filter((product) => {
    // First, filter by category if a category is selected
    const matchesCategory = selectedCategory
      ? product.category_id === selectedCategory.id
      : true; // If no category is selected, don't filter by category

    // Then, filter by the search term
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // Return true only if both filters match
    return matchesCategory && matchesSearch;
  });

  return (
    <Grid columns={4}>
      {filteredProducts.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          mainImage={product.ProductImages[0]?.image_url}
          name={product.name}
          price={product.price}
          user={product.User}
          createdAt={product.created_at}
        ></Card>
      ))}
    </Grid>
  );
};

export default Catalog;
