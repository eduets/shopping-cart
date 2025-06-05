export { ProductCart };
import { useState } from "react";

function ProductCart({
  id,
  name,
  image,
  defaultQuantity,
  handleCartRemove,
  handleCartChange,
}) {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const quantityNumber = Number(quantity);

  function handleRemove() {
    handleCartRemove(id);
  }

  function handleChange(e) {
    setQuantity(e.target.value);
    handleCartChange(id, e.target.value);
  }

  function handleMinus() {
    if (!isNaN(quantityNumber)) {
      if (quantityNumber > 1) {
        setQuantity(-1 + quantityNumber);
        handleCartChange(id, -1 + quantityNumber);
      }
    }
  }

  function handlePlus() {
    if (!isNaN(quantityNumber)) {
      setQuantity(1 + quantityNumber);
      handleCartChange(id, 1 + quantityNumber);
    }
  }

  const result = (
    <div className="product-cart">
      <div
        className="product-cart-image"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <span className="product-cart-name">{name}</span>
      <div className="cart-inputs">
        {/* <label htmlFor={`${id}-quantity`}>Quantity: </label> */}
        <button type="button" onClick={handleMinus}>
          -
        </button>
        <input
          id={`${id}-quantity`}
          type="number"
          name="quantity"
          min="1"
          value={quantity}
          required
          onChange={handleChange}
        />
        <button type="button" onClick={handlePlus}>
          +
        </button>
        <button type="button" className="remove" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
  return result;
}
