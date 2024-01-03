import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [category, setCategory] = useState("All")
  const [sortedStocks, setSortedStocks] = useState([])


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
    setCategory(event)
  }

  const stocksToDisplay = stocks.filter((stock) => {
    if (category === "All") {
      return true
    } else {
      return stock.type === category
    }
  })

  function handleSort(event) {
    // console.log(event)
    if (event === "Alphabetically") {
      const sortedStocks = [...stocks].sort((a, b) => a.name.localeCompare(b.name))
      setStocks(sortedStocks)
    } else if (event === "Price") {
      const sortedStocks = [...stocks].sort((a, b) => a.price - b.price)
      setStocks(sortedStocks)
    }
  }



  return (
    <div>
      <SearchBar handleSort={handleSort} handleFilter={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer handleStockClick={handleStockClick} stocks={sortedStocks.length ? sortedStocks : stocksToDisplay} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} setPortfolio={setPortfolio} handleStockClick={handleStockClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;