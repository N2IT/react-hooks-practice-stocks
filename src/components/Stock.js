import React from "react";

function Stock({ id, name, price, type, ticker  }) {
  return (
    <div>
      <div key={id} className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}: {price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
