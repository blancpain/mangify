import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { mangifyApi } from '@/features/api';
import { userReducer } from './slices/userSlice';
import { calendarReducer } from './slices/calendarSlice';
import { nutritionPreferencesReducer } from './slices/nutritionPreferencesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    calendar: calendarReducer,
    nutritionPreferences: nutritionPreferencesReducer,
    [mangifyApi.reducerPath]: mangifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mangifyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
