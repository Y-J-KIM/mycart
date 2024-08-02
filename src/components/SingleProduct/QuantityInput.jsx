import { useState } from "react";
import "./QuantityInput.css";

const QuantityInput = ({
  quantity,
  stock,
  cartPage,
  productId,
  setQuantity,
}) => {
  // const [quantity, setQuantity] = useState(1);
  return (
    <>
      <button
        onClick={() => {
          cartPage
            ? setQuantity("decrease", productId)
            : setQuantity((prev) => prev - 1);
        }}
        className="quantity_input_button"
        disabled={quantity <= 1}
      >
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        onClick={() => {
          cartPage
            ? setQuantity("increase", productId)
            : setQuantity((prev) => prev + 1);
        }}
        className="quantity_input_button"
        disabled={quantity >= stock}
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
