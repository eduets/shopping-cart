export { Cart };
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ProductCart } from "./ProductCart.jsx";

function Cart() {
  const {
    gameData,
    cartData,
    handleCartCheckout,
    handleCartRemove,
    handleCartChange,
  } = useOutletContext();
  const [isCheckoutDone, setIsCheckoutDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    handleCartCheckout();
    setIsCheckoutDone(true);
  }

  let totalPrice = 0;

  let result;
  const cartDataKeysCount = Object.keys(cartData).length;
  if (isCheckoutDone) {
    result = (
      <div className="cart">
        <div className="message">
          Transaction completed!
          <br />
          <br />
          Thank you for your (fake) purchase!
        </div>
      </div>
    );
  } else if (cartDataKeysCount === 0) {
    result = (
      <div className="cart">
        <div className="message">Your cart is empty</div>
      </div>
    );
  } else {
    const forms = [];
    for (const gameId in cartData) {
      const currentGameData = gameData[gameId];
      totalPrice += currentGameData.price * cartData[gameId].quantity;
      let productCart = (
        <ProductCart
          key={gameId}
          id={gameId}
          name={currentGameData.name}
          image={currentGameData.image}
          price={currentGameData.price}
          defaultQuantity={cartData[gameId].quantity}
          handleCartRemove={handleCartRemove}
          handleCartChange={handleCartChange}
        />
      );
      forms.push(productCart);
    }
    result = (
      <div className="cart">
        <form onSubmit={handleSubmit} className="products-cart">
          {forms}
          <div className="total-price">Total price: ${totalPrice}</div>
          <button type="submit" class="checkout">
            Checkout and pay
          </button>
        </form>
      </div>
    );
  }

  return result;
}
