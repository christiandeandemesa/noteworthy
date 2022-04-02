// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is the Dashboard component.

import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
// Imports the getNotes thunk function.
import {getNotes, reset} from '../features/notes/noteSlice';
// Imports the NoteForm component.
import NoteForm from '../components/NoteForm';
// Imports the NoteItem component.
import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner';
import styles from './Dashboard.module.scss';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    // Destructures the variables from the noteSlice state (state.notes) in the Redux store's state.
    const {notes, isError, isLoading, message} = useSelector(state => state.notes);

    useEffect(() => {
        // If notes.isError is true, log the notes.message.
        if(isError) console.log(message);
        // If a user is not logged in, redirect to the login page.
        if(!user) navigate('/login');
        // Dispatch the getNotes thunk function.
        dispatch(getNotes());
        // Uses a callback function to also dispatche noteSlice's reset action creator function when this component is unmounted.
        return () => {
            dispatch(reset());
        }
    }, [user, isError, message, navigate, dispatch]);

    if(isLoading) return <Spinner/>;

    return (
        <div id={styles.dashboard}>
            <section id={styles.header}>
                {/* If a user is logged in, display the user's first and last name. */}
                <h1>Welcome {user && user.firstName} {user && user.lastName}</h1>
            </section>
            <NoteForm/>
            <section id={styles.notes}>
                {notes.length > 0 ? (
                    <div>
                        {notes.map(note => (
                            <NoteItem key={note._id} note={note}/>
                        ))}
                    </div>
                ) : (
                    <h3>You have not added any notes</h3>
                )}
            </section>
        </div>
    );
}

export default Dashboard;