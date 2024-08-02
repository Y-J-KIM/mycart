import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useData from "../../Hook/useData";

import "./SingleProductPage.css";

import QuantityInput from "./QuantityInput";
import Loader from "../Common/Loader";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";

const SingleProductPage = () => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  // console.log(id);

  const { data: product, error, isLoading } = useData(`/products/${id}`);
  // console.log(product);

  const [quantity, setQuantity] = useState(1);

  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product._id && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>

          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">
              ￦ {product.price.toLocaleString("ko-KR")} 원
            </p>

            {user && (
              <>
                <h2 className="quantity_title">구매개수:</h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="search_button add_cart"
                >
                  장바구니 추가
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
