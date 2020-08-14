import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    firstName: "Yanay",
    lastName: "Lax",
    email: "yanaylax@gmail.com",
    password: "Lalala123",
    birthday: "05/27/1992",
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
  },
});

export const { userAdded, userRemoved } = usersSlice.actions;

export default usersSlice.reducer;
