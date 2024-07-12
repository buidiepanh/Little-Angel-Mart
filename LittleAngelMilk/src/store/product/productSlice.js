import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  cartItems: [],
  lastAction: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      if(action.payload != null){
      state.product = action.payload;
      state.lastAction = "buyNow";
      }
    },
    setCartItems: (state, action) => {
      cartItems : [...state.cartItems, action.payload];
      state.lastAction = "addToCart";
    },
  },
});

export const {  saveProduct, setCartItems } = productSlice.actions;

export default productSlice.reducer;
