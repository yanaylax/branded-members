import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  { id: uuidv4(), name: "Apple", price: 1 },
  { id: uuidv4(), name: "Banana", price: 3 },
  { id: uuidv4(), name: "Orange", price: 5 },
  { id: uuidv4(), name: "Tomato", price: 4 },
  { id: uuidv4(), name: "Cucumber", price: 7 },
  { id: uuidv4(), name: "Grapes", price: 2 },
  { id: uuidv4(), name: "Pepper", price: 3 },
  { id: uuidv4(), name: "Lettuce", price: 8 },
  { id: uuidv4(), name: "Cabbage", price: 1 },
  { id: uuidv4(), name: "Eggs", price: 5 },
];

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    itemAdded(state, action) {
      state.push(action.payload);
    },
    itemRemoved(state, action) {
      const { id } = action.payload;
      const newShop = state.filter((item) => item.id !== id);
      return newShop;
    },
  },
});

export const { itemAdded, itemRemoved } = shopSlice.actions;

export default shopSlice.reducer;
