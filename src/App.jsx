export { App };
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useGameData } from "./scripts/apiHandler.jsx";
import cartIcon from "./assets/icons/shopping-cart.svg";

function App() {
  const { gameData, error, loading } = useGameData();
  const [cartData, setCartData] = useState({});

  function handleProductSubmit(id, quantity) {
    if (typeof quantity === "number" && quantity > 0) {
      const nextCartData = structuredClone(cartData);
      if (id in nextCartData) {
        nextCartData[id].quantity += quantity;
      } else {
        nextCartData[id] = { quantity: quantity };
      }
      setCartData(nextCartData);
    }
  }

  function handleCartCheckout() {
    setCartData({});
  }

  let cartNumber = 0;
  for (const id in cartData) {
    cartNumber += cartData[id].quantity;
  }
  let cartValue = null;
  if (cartNumber > 0) {
    cartValue = <span className="cart-value">{cartNumber.toString()}</span>;
  }

  function handleCartRemove(id) {
    const nextCartData = structuredClone(cartData);
    if (id in nextCartData) {
      delete nextCartData[id];
    }
    setCartData(nextCartData);
  }

  function handleCartChange(id, quantityStr) {
    const quantity = Number(quantityStr);
    if (isNaN(quantity)) {
      return;
    }
    if (typeof quantity === "number" && quantity >= 0) {
      const nextCartData = structuredClone(cartData);
      if (id in nextCartData) {
        nextCartData[id].quantity = quantity;
      }
      setCartData(nextCartData);
    }
  }

  return (
    <>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="shop">SHOP</Link>
        <Link className="cart-nav" to="cart">
          {cartValue}
          <img src={cartIcon} alt="Cart icon" className="cart-icon" />
        </Link>
      </nav>
      <Outlet
        context={{
          gameData,
          error,
          loading,
          handleProductSubmit,
          cartData,
          handleCartCheckout,
          handleCartRemove,
          handleCartChange,
        }}
      />
    </>
  );
}
