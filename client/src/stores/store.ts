import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { mangifyApi } from '@/features/api';

export const store = configureStore({
  reducer: {
    [mangifyApi.reducerPath]: mangifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mangifyApi.middleware),
});

//! check redux tooklit docs for below
//! optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// !see `setupListeners` docs - takes an optional callback as the 2nd arg for customization

// setupListeners(store.dispatch)
