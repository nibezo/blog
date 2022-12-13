import { configureStore } from '@reduxjs/toolkit';
import ArticlesSlice from './reducersSlice/createSlice';

export const store = configureStore({
  reducer: {
    articles: ArticlesSlice,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
