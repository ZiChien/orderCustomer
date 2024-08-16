import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './store/cartSlice'
import merchantReducer from './store/merchantSlice'
import orderSlice from './store/orderSlice'
import storage from 'redux-persist/lib/storage'; // 默認使用 LocalStorage
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  cart: cartReducer,
  merchant: merchantReducer,
  order: orderSlice
});

const persistConfig = {
  key: 'root', // 用於識別持久化數據的鍵
  storage,
  whitelist: ['cart'] // 設置白名單，指定哪些 reducer 的狀態需要被持久化
};
// 創建持久化 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// 創建 persistor 用於持久化操作
const persistor = persistStore(store);

export { store, persistor }