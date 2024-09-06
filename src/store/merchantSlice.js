import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'
import client from '../apolloClient'



export const merchantSlice = createSlice({
    name: 'merchant',
    initialState: {
        merchantInfo: undefined,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMerchantInfo.fulfilled, (state, action) => {
                state.merchantInfo = action.payload,
                    state.status = 'success'
            })
            .addCase(getMerchantInfo.pending, state => {
                state.status = 'loading'
            })
            .addCase(getMerchantInfo.rejected, state => {
                state.status = 'failed'
            })
    }
})
// export const { addItem } = merchantSlice.actions

export const getMerchantInfo = createAsyncThunk(
    'merchant/getMerchantInfo',
    async (arg, thunkAPI) => {
        const state = thunkAPI.getState()
        if (state.merchant.merchantInfo === undefined) {
            const GET_MERCHANT_INFO = gql`
                query Merchant($name: String!) {
                    merchant(name: $name) {
                        address
                        id
                        name
                        displayName
                    }
                }
            `
            const { loading, error, data } = await client.query({
                query: GET_MERCHANT_INFO,
                variables: { name: arg }
            })
            if (!error && data) {
                return data.merchant;
            }else return thunkAPI.rejectWithValue(error)

        } else {
            return state.merchant.merchantInfo
        }
    }
)

export default merchantSlice.reducer