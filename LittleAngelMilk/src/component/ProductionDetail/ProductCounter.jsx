import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../../page/Queries/product";
function ProductCounter() {
  const [count, setCount] = useState(1);

  const { id } = useParams();
  const { data } = useQuery(GET_PRODUCT, {
    variables: { where: { id } },
  });

  const unitPrice = data?.product.productPrice;

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const totalPrice = count * unitPrice;

  return (
    <div>
      <div
        style={{ marginBottom: "10px", fontSize: "16px", color: "black" }}
      ></div>
      <div style={{ marginBottom: "10px", fontSize: "18px", color: "red" }}>
        Giá ước tính sản phẩm: {totalPrice.toLocaleString("vi-VN")}đ
      </div>
      <div>
        Số lượng:
        <button onClick={decrement} style={{ marginRight: "10px" }}>
          -
        </button>
        <span>{count}</span>
        <button onClick={increment} style={{ marginLeft: "10px" }}>
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCounter;
