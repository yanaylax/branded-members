import {configureStore} from "@reduxjs/toolkit";

import usersReducer from "../features/usersSlice";
import shopReducer from "../features/shopSlice";
import loggedReducer from "../features/loggedSlice";
import cartReducer from "../features/cartSlice";


export default configureStore({
    reducer: {
        users: usersReducer,
        logged: loggedReducer,
        shop: shopReducer,
        cart: cartReducer
    }
})