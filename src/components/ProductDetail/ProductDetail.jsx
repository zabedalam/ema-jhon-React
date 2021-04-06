import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const product = fakeData.find(pd => pd.key === productKey);
  return (
    <div>
      {/* <h1>{productKey} Detail Coming soon</h1> */}
      <h2>Detail of Product</h2>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
