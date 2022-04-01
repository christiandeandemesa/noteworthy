// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is each individual NoteItem component.

import {useDispatch} from 'react-redux';
// Imports the deleteNote thunk function.
import {deleteNote} from '../features/notes/noteSlice';

function NoteItem(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                {/* Takes the props object passed into this component from Dashboard.jsx.
                    Because we passed note={note} in Dashboard.jsx we can access it in props (props.note).
                    Each created note has a createdAt key from noteModel.js (props.note.createdAt).
                    new Date() creates a JavaScript Date instance using the given data.
                    .toLocaleString() takes specific strings to convert the Date instance for that specific language and region. */}
                {new Date(props.note.createdAt).toLocaleString('en-US')}
            </div>
            {/* Each created note has a text key from noteModel.js. */}
            <h2>{props.note.text}</h2>
            {/* When this button is clicked, it uses a callback function to dispatch the deleteNote thunk function on the note's id (again from noteModel.js). */}
            <button onClick={() => dispatch(deleteNote(props.note._id))}>Completed</button>
        </div>
    );
}

export default NoteItem;