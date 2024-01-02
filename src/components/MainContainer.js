import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState(""); // To store the sorting criteria

  useEffect(() => {
    fetch(`http://localhost:3001/stocks`)
      .then((res) => res.json())
      .then((stocks) => setStocks(stocks));
  }, []);

  function handleStockClick(name) {
    // Find the selected stock in stocks or portfolio
    const selectedStock = stocks.find((stock) => stock.name === name);
    const selectedPortfolioStock = portfolio.find((stock) => stock.name === name);

    if (selectedStock) {
      // Remove the selected stock from stocks
      const updatedStocks = stocks.filter((stock) => stock.name !== name);
      setStocks(updatedStocks);

      // Add the selected stock to the portfolio
      setPortfolio([...portfolio, selectedStock]);
    } else if (selectedPortfolioStock) {
      // Remove the selected stock from the portfolio
      const updatedPortfolio = portfolio.filter((stock) => stock.name !== name);
      setPortfolio(updatedPortfolio);

      // Add the selected stock back to stocks
      setStocks([selectedPortfolioStock, ...stocks]);
    }
  }

  function handleFilter(event) {
    setCategory(event);
  }

  // Sort the stocksToDisplay array based on the sorting criteria
  const stocksToDisplay = [...stocks];
  const updatedStocksToDisplay = stocksToDisplay.map((stocks) => stocks.name)
  // console.log(updatedStocksToDisplay)
  if (sortBy === "Alphabetical") {
    stocksToDisplay.sort();
  } else if (sortBy === "Price") {
    stocksToDisplay.sort((a, b) => a.price - b.price);
  }

  function handleSort(event) {
    setSortBy(event);
  }

  return (
    <div>
      <SearchBar sortBy={sortBy} handleSort={handleSort} handleFilter={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer handleStockClick={handleStockClick} stocks={stocksToDisplay} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} setPortfolio={setPortfolio} handleStockClick={handleStockClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
