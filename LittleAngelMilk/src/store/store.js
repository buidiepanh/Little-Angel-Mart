import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/order/orderSlice";
import productReducer from "../store/product/productSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
  },
});
