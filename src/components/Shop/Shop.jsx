import React, { useState } from "react";
import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  // console.log(fakeData)
  const firstTenData = fakeData.slice(0, 10);
  console.log(firstTenData);
  const [products, setProducts] = useState(firstTenData);
  const [cart, setCart] = useState([]);

  const handleAddProducts = product => {
    console.log("Product added", product);
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {/* <ul>
          {products.map(product => (
            <li>{product.name}</li>
          ))}
        </ul> */}
        {products.map(product => (
          <Product
            product={product}
            key={product.key}
            handleAddProducts={handleAddProducts}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        {/* <h1>This is cart</h1>
        <h4>Order Summary:{cart.length}</h4> */}
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
