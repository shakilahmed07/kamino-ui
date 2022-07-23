import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from '../features/balanceSlice';

export default configureStore({
  reducer: {
    balance: balanceReducer,
  },
});