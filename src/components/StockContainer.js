import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, handleStockClick }) {
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => (
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

export default StockContainer;
