import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import counterReducer from "../store/order/orderSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
