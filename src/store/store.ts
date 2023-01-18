import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import linkReducer from './linkSlice';

const store = configureStore({
  reducer: linkReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;