import { createSlice } from "@reduxjs/toolkit";



const initialState = false;

const loggedSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    login(state, action) {
      const {index,users}=action.payload
      return state = users[index];
    },
    logout(state) {
      return state = false;
    },
  },
});

export const {
  login,
  logout,
  
} = loggedSlice.actions;

export default loggedSlice.reducer;
