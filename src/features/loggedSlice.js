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
    admin(state){
        return state = "ADMIN"
    }
  },
});

export const {
  login,
  logout,
  admin
  
} = loggedSlice.actions;

export default loggedSlice.reducer;
