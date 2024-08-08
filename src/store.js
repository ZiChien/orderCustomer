import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './store/cartSlice'
import merchantReducer from './store/merchantSlice'
import orderSlice from './store/orderSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    merchant: merchantReducer,
    order: orderSlice
  }
})