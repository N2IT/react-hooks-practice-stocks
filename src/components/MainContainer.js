import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [portfolio, setAsPortfolio] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/stocks`)
      .then((res) => res.json())
      .then((stocks) => setStocks(stocks))
  }, [])

  function handlePurchase(name) {
    const removeFromStockContainer = stocks.filter((stock) => {
      return stock.name !== name
    })

    setStocks(removeFromStockContainer)
    addToPortfolio(name)
  }

  function addToPortfolio(name) {
    const portfolioStock = stocks.find((stock) => stock.name === name);
  
    if (portfolioStock) {
      setAsPortfolio([...portfolio, portfolioStock]);
    }
  }  

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer handlePurchase={handlePurchase} stocks={stocks} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} setAsPortfolio={setAsPortfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
