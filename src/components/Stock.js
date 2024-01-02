import React from "react";

function Stock({ id, name, price, type, ticker, handlePurchase  }) {


  return (
    <div>
      <div key={id} id={id} className="card" onClick={() => handlePurchase(name)}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}: {price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
