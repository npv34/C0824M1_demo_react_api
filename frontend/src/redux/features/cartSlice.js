import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
    },
    reducers: {
        addToCart : (state, action) => {
            const product = action.payload;
            state.items.push(product)
            state.totalPrice += product.price;
            state.totalQuantity += 1;
        }
    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;