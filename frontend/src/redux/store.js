import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        cart: cartReducer
    },
})

export default store;