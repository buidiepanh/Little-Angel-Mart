import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/order/orderSlice";
import productReducer from "../store/product/productSlice";
import searchReducer from "../store/searchProduct/searchSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    search: searchReducer,
  },
});
