import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemAdded(state, action) {
      state.push(action.payload);
    },
    itemRemoved(state, action) {
      const { id } = action.payload;
      const newCart = state.filter((item) => item.id !== id);
      return newCart;
    },
  },
});

export const { itemAdded, itemRemoved } = cartSlice.actions;

export default cartSlice.reducer;
