// This file is the Dashboard component.

import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getNotes, reset} from '../features/notes/noteSlice';
// Imports the NoteForm component.
import NoteForm from '../components/NoteForm';
// Imports the NoteItem component.
import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    // ???
    const {notes, isError, isLoading, message} = useSelector(state => state.notes);

    useEffect(() => {
        // ???
        if(isError) console.log(message);
        // If a user is not logged in, redirect to the login page.
        if(!user) navigate('/login');
        // ???
        dispatch(getNotes());
        // Dispatches noteSlice's reset action creator function when this component is unmounted.
        return () => {
            dispatch(reset());
        }
    }, [user, isError, message, navigate, dispatch]);

    if(isLoading) return <Spinner/>;

    return (
        <div>
            <section>
                {/* If a user is logged in, display the user's first and last name. */}
                <h1>Welcome {user && user.firstName} {user && user.lastName}</h1>
                <p>Notes Dashboard</p>
            </section>
            <NoteForm/>
            <section>
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