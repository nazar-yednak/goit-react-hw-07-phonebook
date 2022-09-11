import { configureStore } from '@reduxjs/toolkit';
import { contactSlice } from './myContact/slice';
import { contactsApi } from './myContact/slice';

export const store = configureStore({
  reducer: {
    contacts: contactSlice.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
