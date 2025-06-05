export { ProductCard };
import { useState } from "react";

function ProductCard({ id, name, image, price, handleProductSubmit }) {
  const [quantity, setQuantity] = useState(1);

  let validNumber = false;
  const quantityNumber = Number(quantity);
  if (!isNaN(quantityNumber) && quantityNumber > 0) {
    validNumber = true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    const quantityValue = Number(e.target.elements.quantity.value);
    handleProductSubmit(id, quantityValue);
    setQuantity(1);
  }

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }

  function handleMinus() {
    if (!isNaN(quantityNumber)) {
      if (quantityNumber > 1) {
        setQuantity(-1 + quantityNumber);
      }
    }
  }

  function handlePlus() {
    if (!isNaN(quantityNumber)) {
      setQuantity(1 + quantityNumber);
    }
  }

  const result = (
    <div className="product-card">
      <div
        className="product-card-image"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="product-card-name">{name}</div>
      <div className="product-card-price">${price}</div>
      <form action="#" onSubmit={handleSubmit} className="product-card-form">
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
          onChange={handleQuantityChange}
          required
        />
        <button type="button" onClick={handlePlus}>
          +
        </button>
        <button type="submit" disabled={!validNumber}>
          Add to cart
        </button>
      </form>
    </div>
  );
  return result;
}
