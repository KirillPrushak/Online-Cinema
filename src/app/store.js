import { configureStore } from '@reduxjs/toolkit';

import currentQueryReducer from '../features/currentQuerySlice';
import { kinopoiskApi } from '../services/kinopoiskApi';

export const store = configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    currentQuerySlice: currentQueryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kinopoiskApi.middleware),
});
