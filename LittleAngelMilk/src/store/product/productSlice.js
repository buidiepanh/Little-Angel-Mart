import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

export const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { saveProduct } = productSlide.actions;

export default productSlide.reducer;
