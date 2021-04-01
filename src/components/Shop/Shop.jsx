import React, { useState } from "react";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  // console.log(fakeData)
  const firstTenData = fakeData.slice(0, 10);
    console.log(firstTenData);
  const [products, setProducts] = useState(firstTenData);

  return (
    <div className="shop-container">
      <div className="product-container">
        {/* <ul>
          {products.map(product => (
            <li>{product.name}</li>
          ))}
        </ul> */}
        {products.map(product => (
          <Product product={product} key={product.key}></Product>
        ))}
      </div>
      <div className="cart-container">
        <h1>This is cart</h1>
      </div>
    </div>
  );
};

export default Shop;