import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiMerchantInfo } from '../api'


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
            .addCase(getMerchantInfo.pending,state =>{
                state.status = 'loading'
            })
            .addCase(getMerchantInfo.rejected,state =>{
                state.status = 'failed'
            })
    }
})
// export const { addItem } = merchantSlice.actions

export const getMerchantInfo = createAsyncThunk(
    'merchant/getMerchantInfo',
    async (arg, thunkAPI) => {
        const state = thunkAPI.getState()
        if(state.merchant.merchantInfo === undefined){
            console.log(state.merchant.merchantInfo);
            
            const response = await apiMerchantInfo();
            return response.data;
        }else{
            return state.merchant.merchantInfo
        }
    }
)

export default merchantSlice.reducer