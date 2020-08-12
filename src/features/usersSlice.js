import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    firstName: "Yanay",
    lastName: "Lax",
    email: "yanaylax@gmail.com",
    password: "Lalala123",
    birthday: "05/27/1992",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
      userAdded(state,action) {
          state.push(action.payload)
      }
  },
});

export const {userAdded} = usersSlice.actions

export default usersSlice.reducer;
