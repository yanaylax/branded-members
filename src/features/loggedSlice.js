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
    },
    currentFromLocal(state,action){
      return state=action.payload
    }
  },
});

export const {
  login,
  logout,
  admin,
  currentFromLocal
  
} = loggedSlice.actions;

export default loggedSlice.reducer;
