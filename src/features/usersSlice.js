import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action) {
      state.push(action.payload);
    },
    userRemoved(state, action) {
      const { id } = action.payload;
      const newUsers = state.filter((user) => user.id !== id);
      return newUsers;
    },
    usersFromLocal(state, action) {
      return (state = action.payload);
    },
  },
});

export const { userAdded, userRemoved, usersFromLocal } = usersSlice.actions;

export default usersSlice.reducer;
