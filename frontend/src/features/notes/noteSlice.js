// This file is a slice of the entire application's state, particularly user's notes.

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// ???
import noteService from './noteService';

const initialState = {
    // notes is initially an empty array because a user can have multiple notes.
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// ???
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

// ???
// Because we need to thunkAPI in the ???, we pass an underscore as a dummy argument.
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

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        // The reset action creator resets the authSlice's state to the above initialState.
        reset: state => initialState
    },
    extraReducers: builder => {
        builder
            // ???
            .addCase(createNote.pending, state => {
                state.isLoading = true
            })
            // ???
            .addCase(createNote.fulfilled, (state, action) => {
                // ???
                state.notes.push(action.payload)
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            // ???
            .addCase(getNotes.pending, state => {
                state.isLoading = true
            })
            // ???
            .addCase(getNotes.fulfilled, (state, action) => {
                // ???
                state.notes = action.payload;
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
});

// ???
export const {reset} = noteSlice.actions;
// ???
export default noteSlice.reducer;