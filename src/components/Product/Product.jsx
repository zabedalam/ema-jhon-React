import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./Product.css";
import { Link } from "react-router-dom";

const Product = props => {
  console.log("product", props);
  const { name, img, price, seller, stock,key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="product-detail">
        {" "}
        <h4 className="product-name"><Link to={'/product/'+key}>{name}</Link></h4>{" "}
        <p>
          <small>by: {seller}</small>
        </p>
        <p>$: {price}</p>
        <p>
          <small>only {stock} left in stock-order soon</small>
        </p>
        {props.showAddToCart && <button
          className="btn-main"
          onClick={() => props.handleAddProducts(props.product)}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          add to cart
        </button>}
      </div>
    </div>
  );
};

export default Product;
