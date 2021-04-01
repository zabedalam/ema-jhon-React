import React from "react";
import "./Product.css";

const Product = props => {
  console.log("product", props);
  const { name, img, price, seller, stock } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="product-detail">
        {" "}
        <h4 className="product-name">{name}</h4>{" "}
        <p>
          <small>by: {seller}</small>
        </p>
        <p>$: {price}</p>
        <p>
          <small>only {stock} left in stock-order soon</small>
        </p>
      </div>
    </div>
  );
};

export default Product;
