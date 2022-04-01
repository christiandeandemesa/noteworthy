// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is a slice of the entire application's state, particularly the user's authorization.

// Imports createSlice and createAsyncThunk from the redux toolkit.
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// Imports the authService object.
import authService from './authService';

// user is the item out of localStorage with the key of user, then converts the JSON string (i.e. the value) into a JavaScript data type.
const user = JSON.parse(localStorage.getItem('user'));

// This is the initial state of the user.
const initialState = {
    // If the above user variable exists, its value is itself. 
    // If user doesn't exist, its value is null.
    user: user ? user: null,
    // Its error, success, and loading statuses are false.
    isError: false,
    isSuccess: false,
    isLoading: false,
    // message for the above statuses is an empty string.
    message: ''
}

// Exports the register thunk function, which is normally used to make asynchronous requests (e.g. API requests).
// The first argument ('auth/register') is the action's type, and the second argument is a payloadCreator callback function that returns a promise or an error.
/*
The payloadCreator callback function's first argument (user) is the authSlice's state's user, and the second argument (thunkAPI) is an object containing parameters for a 
Redux thunk function (e.g. dispatch, getState, etc.).
*/
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    // Tries to run the authService object's register function with the authSlice's state's user.
    try {
        return await authService.register(user);
    }
    // If the try block's code fails, it catches an error (err).
    catch(err) {
        // authSlice's state's message is either the error's response object's data's message, the error's message, or the error as a string.
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        // .rejectWithValue() is a Redux thunk function parameter that throws the above error message.
        return thunkAPI.rejectWithValue(message);
    }
});

/*
Exports the login thunk function where the payload callback function is similar to the register's payload callback function, except it runs the authService object's 
login function.
*/
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    }
    catch(err) {
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Exports the logout thunk function where the payload callback function runs the authService object's logout function.
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

// Exports the authSlice function that creates action creator functions and a reducer function.
export const authSlice = createSlice({
    // authSlice's name.
    name: 'auth',
    // authSlice's initial state is the above initialState variable.
    initialState,
    // reducers holds authSlice's action creator function(s).
    reducers: {
        // The reset action creator resets the authSlice's state's statuses and message to its initial state.
        reset: state => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    // extraReducers holds authSlice's action responses that are not action creator functions.
    // The builder object defines what action responses/types authSlice's reducer will handle.
    extraReducers: builder => {
        builder
            // .addCase() handles one specific action response/type.
            // .pending is a promise's state where it hasn't succeeded or failed yet.
            // If the register thunk function's promise is pending, the authSlice's state's loading status is true.
            .addCase(register.pending, state => {
                state.isLoading = true
            })
            // .fulfilled is a promise's state where it has succeeded.
            /*
            If the register thunk function's promise is fulfilled, the authSlice's state's user is the action object's payload, its success status is true, and its 
            loading status is false.
            */
            // The action object comes from what is returned in the register thunk function's try block, and the payload is the data the action holds.
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            // .rejected is a promise's state where it has failed.
            /*
            If the register thunk function's promise is rejected, the authSlice's state's user is null, its error status is true, its loading status is false, and its 
            message is the action's payload.
            */
            .addCase(register.rejected, (state, action) => {
                state.user = null
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            // If the login thunk function's promise is pending, the authSlice's state's loading status is true.
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            /*
            If the login thunk function's promise is fulfilled, the authSlice's state's user is the action object's payload, its success status is true, and its loading 
            status is false.
            */
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            /*
            If the login thunk function's promise is rejected, the authSlice's state's user is null, its error status is true, its loading status is false, and its 
            message is the action's payload.
            */
            .addCase(login.rejected, (state, action) => {
                state.user = null
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            // If the logout thunk function is fulfilled, the authSlice's state's user is null.
            .addCase(logout.fulfilled, state => {
                state.user = null
            })
    }
});

// Exports the authSlice's action creator function in its actions key.
export const {reset} = authSlice.actions;
// Exports the authSlice's reducer function in its reducer key.
export default authSlice.reducer;