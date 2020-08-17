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
    amountIncreased(state, action) {
      const { id, amount } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.amount = existingItem.amount + amount;
      }
    },
    emptyCart(state,action) {
      return state=[];
    },
    cartFromLocal(state,action){
      return state=action.payload
    }
  },
});

export const { itemAdded, itemRemoved, amountIncreased, cartFromLocal, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
