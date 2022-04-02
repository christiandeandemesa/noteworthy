// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is the Header component.

// Imports Link from the react-router-dom package.
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Imports the logout thunk function.
import { logout, reset } from '../features/auth/authSlice';
// Imports this component's sass stylesheet module.
import styles from './Header.module.scss';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    // This function logs outs the logged in user.
    const onLogout = () => {
        // Dispatch authSlice's logout thunk function.
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        // Example of using the sass stylesheet module id.
        <header id={styles.navbar}>
            {/* Link works similar to <a href> by creating a hyperlink on the given text (e.g. Dashboard) to the url it appends. */}
            {/* Example of using the sass stylesheet class. */}
            <Link to='/' className={styles.link}>Dashboard</Link>
            {user ? (
                // If user exists, show the below div element.
                <div>
                    {/* If this button is clicked, run the above onLogout function. */}
                    <button onClick={onLogout} id={styles.button}>Logout</button>
                </div >
            ) : (
                // If a user does not exist, show the below fragment <> element.
                <>
                    <div>
                        <Link to = '/login' className={styles.link}>Login</Link>
                    </div >
                    <div className={styles.link} id={styles.right_link}>
                        <Link to='/register' className={styles.link}>Register</Link>
                    </div>
                </>
            )
            }
        </header >
    );
}

export default Header;