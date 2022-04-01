// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is the NoteForm component.

import {useState} from 'react';
import {useDispatch} from 'react-redux';
// Imports the createNote thunk function.
import {createNote} from '../features/notes/noteSlice';

function NoteForm() {
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();

        // Dispatches the createNote thunk function by passing in the text's state as an object.
        dispatch(createNote({text}));
        // Changes text's state to be an empty string again to create additional notes.
        setText('');
    }

    return (
        <section>
            <form onSubmit={onSubmit}>
                {/* htmlFor attribute associates this label with the element that has an id of text. */}
                <label htmlFor='text'>Note</label>
                <input
                    type='text'
                    name='text'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    // id attribute was added to use the label tag's htmlFor attribute.
                    id='text'
                />
                <button>Add Note</button>
            </form>
        </section>
    );
}

export default NoteForm;