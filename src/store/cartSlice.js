import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'

const initialState = {
    value: [],
    priceList: [],
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.value.push(action.payload)
        },
        setItem: (state, action) => {
            state.value = action.payload
        },
        setPriceList: (state, action) => {
            state.priceList = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
})
export const { addItem, setItem, setPriceList } = cartSlice.actions
export const getAmount = (state) => {
    return state.cart.value.reduce((acc, item) => acc + item.amount, 0)
}
export default cartSlice.reducer