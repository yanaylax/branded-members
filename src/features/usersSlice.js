import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


const initialState = [
  {
    firstName: "Yanay",
    lastName: "Lax",
    email: "yanaylax@gmail.com",
    password: "Lalala123",
    birthday: "05/27/1992",
    age: 28,
    id: uuidv4(),
  },
  {
    firstName: "Yanay1",
    lastName: "Lax",
    email: "yanaylax@gmail.com",
    password: "Lalala123",
    birthday: "05/27/1992",
    age: 26,
    id: uuidv4(),
  },
  {
    firstName: "Yanay2",
    lastName: "Lax",
    email: "yanaylax@gmail.com",
    password: "Lalala123",
    birthday: "05/27/1992",
    age: 27,
    id: uuidv4(),
  },
  {
    firstName: "Yanay3",
    lastName: "Lax",
    email: "yanaylax@gmail.com",
    password: "Lalala123",
    birthday: "05/27/1992",
    age: 25,
    id: uuidv4(),
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action) {
      state.push(action.payload);
    },
    userRemoved(state, action) {
      const { id } = action.payload;
      const newUsers = state.filter(user => user.id !== id)
      return newUsers;
    },
    usersFromLocal(state,action){
        return state=action.payload
    }
  },
});

export const { userAdded, userRemoved, usersFromLocal } = usersSlice.actions;

export default usersSlice.reducer;
