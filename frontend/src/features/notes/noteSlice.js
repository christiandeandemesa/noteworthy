// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is a slice of the entire application's state, particularly user's notes.

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// Imports the noteService object.
import noteService from './noteService';

const initialState = {
    // notes is initially an empty array because a user can have multiple notes.
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Exports the createNote thunk function.
export const createNote = createAsyncThunk('notes/create', async (noteData, thunkAPI) => {
    try {
        // thunkAPI can be used to access other slices in the Redux store's state.
        // token is the authSlice's state's user's token.
        const token = thunkAPI.getState().auth.user.token;
        // Because all the notes routes are protected, we need the user's token.
        return await noteService.createNote(noteData, token);
    }
    catch(err) {
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Exports the getNotes thunk function.
// Because we need to thunkAPI in the second argument, we pass an underscore as a dummy argument.
export const getNotes = createAsyncThunk('notes/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        // Only token is passed in since we are not passing information to create or update a note.
        return await noteService.getNotes(token);
    }
    catch(err) {
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Exports the deleteNote thunk function.
export const deleteNote = createAsyncThunk('notes/deleteNote', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.deleteNote(id, token);
    }
    catch(err) {
        const message = (err.res && err.res.data && err.res.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        // The reset action creator resets the authSlice's state to the above initialState.
        reset: state => initialState
    },
    extraReducers: builder => {
        builder
            // These are all the possible action responses/types for each status for the createNote thunk function.
            .addCase(createNote.pending, state => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                // Since state.notes is an array in intitialState, we push the action.payload into it to preserve the previous array.
                state.notes.push(action.payload)
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            // These are all the possible action responses/types for each status for the getNotes thunk function.
            .addCase(getNotes.pending, state => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                // Changes the state.notes array to only hold the notes the user gets back.
                state.notes = action.payload;
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            // These are all the possible action responses/types for each status for the deleteNote thunk function.
            .addCase(deleteNote.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                // Uses .filter() to remove the note whose id (note._id) no longer matches any id in the action.payload since it was deleted.
                state.notes = state.notes.filter(note => note._id !== action.payload.id);
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
});

// Exports the noteSlice's action creator function in its actions key.
export const {reset} = noteSlice.actions;
// Exports the noteSlice's reducer function in its reducer key.
export default noteSlice.reducer;