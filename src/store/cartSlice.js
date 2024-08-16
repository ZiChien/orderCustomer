import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: [],
        priceList: [],
    },
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
})
export const { addItem, setItem, setPriceList } = cartSlice.actions
export const getAmount = (state) => {
    return state.cart.value.reduce((acc, item) => acc + item.amount, 0)
}
export default cartSlice.reducer