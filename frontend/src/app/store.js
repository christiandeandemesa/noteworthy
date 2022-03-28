// This file is the Redux store.

// Imports configureStore from the redux toolkit.
import { configureStore } from '@reduxjs/toolkit';
// Imports the authReducer function.
import authReducer from '../features/auth/authSlice';

/*
Exports the Redux store (store) which is created using all the reducers functions (i.e. the object value of reducers), which are key-value pairs where each reducer 
function (e.g. authReducer) is the value to an appropriately named key (e.g. auth).
*/
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});