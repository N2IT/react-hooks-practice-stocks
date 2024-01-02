import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, handleStockClick }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((stock) => (
        <Stock
          stock={stock}
          key={stock.id}
          name={stock.name}
          price={stock.price}
          ticker={stock.ticker}
          type={stock.type}
          handleStockClick={handleStockClick} />
      ))}
    </div>
  );
}

export default PortfolioContainer;
