import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: []
    },
    reducers: {
        addItem: (state, action) => {
            state.value.push(action.payload)
        },
        setItem: (state, action) => {
            state.value = action.payload
        }
    },
})
export const { addItem, setItem } = cartSlice.actions
export const getAmount = (state) => {
    return state.cart.value.reduce((acc, item)=> acc + item.amount, 0)
}
export default cartSlice.reducer