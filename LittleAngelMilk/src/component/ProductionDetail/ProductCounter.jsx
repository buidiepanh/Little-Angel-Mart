import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../../page/Queries/product";
import {
  incrementProductCount,
  decrementProductCount,
} from "../../store/order/orderSlice";
import { formatMoney } from "../../utils/formatMoney";

function ProductCounter() {
  const { id } = useParams();
  const { data } = useQuery(GET_PRODUCT, {
    variables: { where: { id } },
  });
  const unitPrice = data?.product.productPrice;

  //Use data from redux
  const productCount = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const totalPrice = productCount * unitPrice;

  const increment = () => {
    dispatch(incrementProductCount());
  };

  const decrement = () => {
    dispatch(decrementProductCount());
  };

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
        <span>{productCount}</span>
        <button onClick={increment} style={{ marginLeft: "10px" }}>
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCounter;
