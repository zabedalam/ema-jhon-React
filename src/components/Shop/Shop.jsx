import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import { Link } from "react-router-dom";

import {
  addToDatabaseCart,
  getDatabaseCart
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  // console.log(fakeData)
  const firstTenData = fakeData.slice(0, 10);
  console.log(firstTenData);
  const [products, setProducts] = useState(firstTenData);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map(existingKey => {
      const product = fakeData.find(pd => pd.key === existingKey);
      // console.log(existingKey,savedCart[existingKey])
      product.quantity = savedCart[existingKey];
      return product;
    });
    setCart(previousCart);
    // console.log(previousCart)
  }, []);

  const handleAddProducts = product => {
    console.log("Product added", product);
    // const newCart = [...cart, product];
    // setCart(newCart);
    // const sameProduct=newCart.filter(pd=>pd.key===product.key);
    // const count=sameProduct.length
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
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
            showAddToCart={true}
            product={product}
            key={product.key}
            handleAddProducts={handleAddProducts}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        {/* <h1>This is cart</h1>
        <h4>Order Summary:{cart.length}</h4> */}
        <Cart cart={cart}>
          {" "}
          <Link to="/review">
            <button className="btn-main">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
