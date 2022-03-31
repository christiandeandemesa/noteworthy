// This file is the Redux store.

// Imports configureStore from the redux toolkit.
import { configureStore } from '@reduxjs/toolkit';
// Imports authSlice's reducer function and renames it as authReducer.
import authReducer from '../features/auth/authSlice';
// Imports noteSlice's reducer function and renames it as noteReducer.
import noteReducer from '../features/notes/noteSlice';

/*
Exports the Redux store (store) which is created using all the reducers functions (i.e. the object value of reducers), which are key-value pairs where each reducer 
function (e.g. authReducer) is the value to an appropriately named key (e.g. auth).
*/
export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer
  }
});