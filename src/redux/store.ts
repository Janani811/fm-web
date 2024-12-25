import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/redux/slices/authSlice';
import problemReducer from '@/redux/slices/errorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problem: problemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
