import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  { id: uuidv4(), name: "Apple",description:"Fruit", price: 1 },
  { id: uuidv4(), name: "Banana",description:"Fruit", price: 3 },
  { id: uuidv4(), name: "Orange",description:"Fruit", price: 5 },
  { id: uuidv4(), name: "Tomato",description:"Fruit?", price: 4 },
  { id: uuidv4(), name: "Cucumber",description:"Vegetable", price: 7 },
  { id: uuidv4(), name: "Grapes",description:"Fruit", price: 2 },
  { id: uuidv4(), name: "Pepper",description:"Vegetable", price: 3 },
  { id: uuidv4(), name: "Lettuce",description:"Vegetable", price: 8 },
  { id: uuidv4(), name: "Cabbage",description:"Vegetable", price: 1 },
  { id: uuidv4(), name: "Eggs",description:"You wat?", price: 5 },
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
