import useData from "../../Hook/useData";
import ProductCard from "../Products/ProductCard";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const { data: products, error, isLoading } = useData("/products/featured");
  const skeletons = [1, 2, 3];

  return (
    <section className="featured_products">
      <h2>주요제품</h2>

      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
