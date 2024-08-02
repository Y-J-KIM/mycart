import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../../Hook/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams(); //?뒤의 쿼리스트링 가져옴
  const category = search.get("category"); //쿼리스트링에서 category=값을 가져옴
  const page = search.get("page");
  const searchQuery = search.get("search"); //검색어 가져옴
  //console.log("넘어오는 카테고리: " + category);
  //서버에서 가져오는 데이터에는 제품데이터 및 페이지등 다른 데이터도 있음.
  const { data, error, isLoading } = useData(
    "products",
    { params: { search: searchQuery, category, page } },
    [category, page, searchQuery]
  );
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  //쿼리스트링 search에 페이지를 업데이트함
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products]; //제품데이터 복사

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price)); //가격 큰순
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price)); //가격 작은순
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        ); //평점 큰순
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        ); //평점 작은순
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {data.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {/* 페이지네이션 넣기 */}
      {data && (
        <Pagination
          total={data.totalProducts}
          perPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductsList;
