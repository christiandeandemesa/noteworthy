// This file is the Header component.

// Imports Link from the react-router-dom package.
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Imports the logout thunk function.
import { logout, reset } from '../features/auth/authSlice';
// import react-icons

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
        <header>
            <div>
                {/* Link works similar to <a href> by creating a hyperlink on the given text (e.g. Dashboard) to the url it appends. */}
                <Link to='/'>Dashboard</Link>
                {/* react-icon */}
            </div>
            {user ? (
                // If user exists, show the below div element.
                <div>
                    {/* If this button is clicked, run the above onLogout function. */}
                    <button onClick={onLogout}>Logout</button>
                    {/* react-icon */ }
                </div >
            ) : (
                // If a user does not exist, show the below fragment <> element.
                <>
                    <div>
                        <Link to = '/login'>Login</Link>
                        {/* react-icon */ }
                    </div >
                    <div>
                        <Link to='/register'>Register</Link>
                        {/* react-icon */}
                    </div>
                </>
            )
}
        </header >
    );
}

export default Header;