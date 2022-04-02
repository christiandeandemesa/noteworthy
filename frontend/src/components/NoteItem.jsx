// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is each individual NoteItem component.

import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// Imports the deleteNote thunk function.
import {deleteNote} from '../features/notes/noteSlice';
import styles from './NoteItem.module.scss';

function NoteItem(props) {
    console.log(props);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // This function redirects to a page that views a specific note.
    const editNotePage = () => {
        // Redirects by appending /edit/<note's _id> to the url.
        // Passes an object called state whose value is another object with keys and values from props.note.
        navigate('/edit/' + props.note._id, {state: {
            createdAt: props.note.createdAt,
            text: props.note.text,
            updatedAt: props.note.updatedAt,
            user: props.note.user,
            _id: props.note._id
        }});
    }

    return (
        <section id={styles.note}>
            {/* Each created note has a text key from noteModel.js. */}
            <h2>{props.note.text}</h2>
            <div id={styles.buttons}>
                {/* When this button is clicked, it uses a callback function to navigate to the EditNote component. */}
                <button onClick={editNotePage}>View</button> {/* Change to Edit later. */}
                {/* When this button is clicked, it uses a callback function to dispatch the deleteNote thunk function on the note's id (again from noteModel.js). */}
                <button onClick={() => dispatch(deleteNote(props.note._id))}>Delete</button>
            </div>
        </section>
    );
}

export default NoteItem;