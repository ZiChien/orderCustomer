import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        tableware: false,
    },
    reducers: {
        setTableware: (state, action) => {
            state.tableware = action.payload
        },
    },
})
export const { setTableware } = orderSlice.actions
export default orderSlice.reducer