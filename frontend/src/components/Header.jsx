// This file is the Header component.

// Imports Link from the react-router-dom package.
import {Link} from 'react-router-dom';
// import react-icons

function Header() {
    return (
        <header>
            <div>
                {/* Link works similar to <a href> by creating a hyperlink on the given text (e.g. Dashboard) to the url it appends. */}
                <Link to='/'>Dashboard</Link>
                {/* react-icon */}
            </div>
            <div>
                <Link to='/login'>Login</Link>
                {/* react-icon */}
            </div>
            <div>
                <Link to='/register'>Register</Link>
                {/* react-icon */}
            </div>
        </header>
    );
}

export default Header;