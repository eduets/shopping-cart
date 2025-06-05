export { Shop };
import { useOutletContext } from "react-router-dom";
import { ProductCard } from "./ProductCard.jsx";

function Shop() {
  const { gameData, error, loading, handleProductSubmit } = useOutletContext();

  let result = null;
  if (loading) {
    result = (
      <div className="shop">
        <div className="message">Loading...</div>
      </div>
    );
  } else if (error) {
    result = (
      <div className="shop">
        <div className="message">An error ocurred</div>
      </div>
    );
  } else {
    result = [];
    for (const gameId in gameData) {
      result.push(
        <ProductCard
          key={gameId}
          id={gameId}
          name={gameData[gameId].name}
          image={gameData[gameId].image}
          price={gameData[gameId].price}
          handleProductSubmit={handleProductSubmit}
        />
      );
    }
  }

  return (
    <div className="shop">
      <h1>SHOP</h1>
      <div className="product-cards">{result}</div>
    </div>
  );
}
