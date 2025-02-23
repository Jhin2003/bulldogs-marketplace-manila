import useTrendingWord from "../hooks/useGetTrendingWord";
import useProducts from "../hooks/useProducts";
import Card from "./Card";
import "./TrendingSection.scss"
import Grid from "./Layout/Grid";

const TrendingSection = ({ selectedCategory }) => {
    const { trendingWord, loading, error } = useTrendingWord();
    const { products, loading: productsLoading, error: productsError } = useProducts(trendingWord?.trendingWord, selectedCategory?.id);
  
    if (loading || productsLoading) return <p>Loading...</p>;
    if (error || productsError) return <p>Error loading trending products.</p>;

    const maxTrendingProducts = 3; // ✅ Limit the number of trending products shown

    // 🔥 Ensure filtering happens after fetching
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(trendingWord?.trendingWord?.toLowerCase())
    );

    return (
      <div className="trending-section">
        <h2> Trending Now</h2>
        <Grid columns={6}>
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, maxTrendingProducts).map((product) => (  // ✅ Limit display using .slice()
              <Card key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
       </Grid>
      </div>
    );
};

export default TrendingSection;