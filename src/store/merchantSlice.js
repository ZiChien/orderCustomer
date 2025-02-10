import { createSlice } from '@reduxjs/toolkit'

export const merchantSlice = createSlice({
    name: 'merchant',
    initialState: {
        merchantInfo: undefined,
    },
    reducers: {
        setMerchantInfo: (state, action) => {
            state.merchantInfo = action.payload
        }
    },
})
export const { setMerchantInfo } = merchantSlice.actions
export default merchantSlice.reducer