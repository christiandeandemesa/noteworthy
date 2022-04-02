// This file ???

// Imports useLocation from the react-router-dom package.
import {useLocation} from 'react-router-dom';

function EditNote() {
    // location is an object that contains a key called state, which is an object we passed data (e.g. props) into from NoteItem.jsx.
    const location = useLocation();

    return (
        <div>
            {/* Example of accessing a key we passed into state from NoteItem.jsx. */}
            <h1>{location.state.text}</h1>
            {/* new Date() creates a JavaScript Date instance using the given data.
                .toLocaleString() takes specific strings to convert the Date instance for that specific language and region. */}
            <h1>Created on: {new Date(location.state.createdAt).toLocaleString('en-US')}</h1>
            <h1>Updated on: {new Date(location.state.createdAt).toLocaleString('en-US')}</h1>
        </div>
    );
}

export default EditNote;