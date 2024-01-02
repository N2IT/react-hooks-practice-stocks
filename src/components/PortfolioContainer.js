import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, handlePurchase }) {
  console.log(portfolio)
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
          handlePurchase={handlePurchase} />
      ))}
    </div>
  );
}

export default PortfolioContainer;
