import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    id: uuidv4(),
    name: "Apple",
    description: "Fruit",
    price: 1,
    image:
      "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
  },
  {
    id: uuidv4(),
    name: "Banana",
    description: "Fruit",
    price: 3,
    image: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG.jpg",
  },
  {
    id: uuidv4(),
    name: "Orange",
    description: "Fruit",
    price: 5,
    image:
      "https://lh3.googleusercontent.com/proxy/hVJ2M5O7c1cM5BKU5uMZt2dBoKMRAGCqxk8TJAuGfzyoWQU5qGFZ6FsMwqGe7VnIqdliLuYXnSIODGE",
  },
  {
    id: uuidv4(),
    name: "Tomato",
    description: "Fruit?",
    price: 4,
    image: "https://www.footstore.com.au/wp-content/uploads/2019/09/tomato.jpg",
  },
  {
    id: uuidv4(),
    name: "Cucumber",
    description: "Vegetable",
    price: 7,
    image: "https://cdn.mos.cms.futurecdn.net/EBEXFvqez44hySrWqNs3CZ.jpg",
  },
  {
    id: uuidv4(),
    name: "Grapes",
    description: "Fruit",
    price: 2,
    image: "https://dial2nature.com/wp-content/uploads/2019/12/grapes.jpg",
  },
  {
    id: uuidv4(),
    name: "Pepper",
    description: "Vegetable",
    price: 3,
    image:
      "https://www.chilipeppermadness.com/wp-content/uploads/2019/08/Bell-Peppers.jpg",
  },
  {
    id: uuidv4(),
    name: "Lettuce",
    description: "Vegetable",
    price: 8,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41CGtIyWgML._AC_.jpg",
  },
  {
    id: uuidv4(),
    name: "Cabbage",
    description: "Vegetable",
    price: 1,
    image:
      "https://pcdn.columbian.com/wp-content/uploads/2019/08/0830_met_cabbage-1226x0-c-default.jpg",
  },
  {
    id: uuidv4(),
    name: "Eggs",
    description: "You wat?",
    price: 5,
    image:
      "https://i0.wp.com/ajp.com.au/wp-content/uploads/2019/11/Eggs.png?fit=705%2C436&ssl=1",
  },
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
    shopFromLocal(state, action) {
      return (state = action.payload);
    },
  },
});

export const { itemAdded, itemRemoved, shopFromLocal } = shopSlice.actions;

export default shopSlice.reducer;
