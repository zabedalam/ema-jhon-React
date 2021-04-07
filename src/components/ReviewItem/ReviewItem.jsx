import React from "react";
import "./ReviewItem.css";

const ReviewItem = props => {
  const { name, quantity, price, key } = props.product;
  console.log(props);
  return (
    <div className="review-product">
      <h4 className="product-name">{name}</h4>
      <p>Quantity:{quantity}</p>
      <p>
        <small>${price}</small>
      </p>
      <br />
      <button className="btn-main" onClick={() => props.removeProduct(key)}>
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
