import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../../page/Queries/product";
import {
  incrementProductCount,
  decrementProductCount,
} from "../../store/order/orderSlice";
import { formatMoney } from "../../utils/formatMoney";

function ProductCounter() {
  const [count, setCount] = useState(1);
  const productCount = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { data } = useQuery(GET_PRODUCT, {
    variables: { where: { id } },
  });

  const unitPrice = data?.product.productPrice;

  const increment = () => {
    // setCount((prevCount) => prevCount + 1);
    dispatch(incrementProductCount());
  };

  const decrement = () => {
    // if (count > 1) {
    //   setCount((prevCount) => prevCount - 1);
    // }
    dispatch(decrementProductCount());
  };

  const totalPrice = count * unitPrice;

  return (
    <div>
      <div
        style={{ marginBottom: "10px", fontSize: "16px", color: "black" }}
      ></div>
      <div style={{ marginBottom: "10px", fontSize: "18px", color: "red" }}>
        Giá ước tính sản phẩm: {formatMoney(totalPrice)}
      </div>
      <div>
        Số lượng:
        <button onClick={decrement} style={{ marginRight: "10px" }}>
          -
        </button>
        {/* <span>{count}</span> */}
        <span>{productCount}</span>
        <button onClick={increment} style={{ marginLeft: "10px" }}>
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCounter;
