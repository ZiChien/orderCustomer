import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        tableware: false,
        remark: '',
        isPickup: true,
        customer:{
            name: '',
            phone: '',
        },
        pickUpDate: '',
        pickUpTime: '',
    },
    reducers: {
        setTableware: (state, action) => {
            state.tableware = action.payload
        },
        setRemark: (state, action) => {
            state.remark = action.payload
        },
        setIsPickup: (state, action) => {
            state.isPickup = action.payload
        },
        setCustomer: (state, action) => {
            state.customer = action.payload
        },
        setPickUpDate: (state, action) => {
            state.pickUpDate = action.payload
        },
        setPickUpTime: (state, action) => {
            state.pickUpTime = action.payload
        },
    },
})
export const { setTableware, setRemark, setIsPickup, setCustomer, setPickUpDate, setPickUpTime } = orderSlice.actions
export default orderSlice.reducer