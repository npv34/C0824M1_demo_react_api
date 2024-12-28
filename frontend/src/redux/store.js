import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import authReducer from "./features/authSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
    },
})

export default store;