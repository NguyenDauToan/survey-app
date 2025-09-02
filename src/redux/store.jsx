// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

// Tạo Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // thêm các slice reducer vào đây
  },
})
