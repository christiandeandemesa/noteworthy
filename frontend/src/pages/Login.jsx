// This file is the Login component.

// Imports useState and useEffect from the react package.
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {login, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
// Import react-icons.

function Login() {
    // formData's initial state is an object with empty strings.
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Destructures the keys as variables from the formData state.
    const {email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth);

    useEffect(() => {
        if(isError) toast.error(message);
        if(isSuccess || user) navigate('/');
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    // onSubmit function submits the form's information.
    const onSubmit = e => {
        // Stops the component from re-rendering and refreshing the page.
        e.preventDefault();

        const userData = {
            email,
            password
        }
        // Dispatch authSlice's login thunk function with the above userData object as the user argument.
        dispatch(login(userData));
    }

    if(isLoading) return <Spinner/>;

    // onChange function updates a specific part of the formData state.
    const onChange = e => {
        // setFormData sets a new formData state using the previous formData state (prevFormData).
        setFormData(prevFormData => ({
            // Spreads over prevFormData to keep the parts of the state that were not changed.
            ...prevFormData,
            /*
            Locates the key in the prevFormData state using e.target.name (e is short for event, target is the input that triggered the onChange function, and name is 
            that input's name attribute).
            Updates the key's value with e.target.value (value is the value attribute in that input).
            */
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div>
            <section>
                <h1>
                    {/* react-icon */}
                    Login
                </h1>
                <p>Please log into your account</p>
            </section>

            <section>
                {/* When the button within this form element is clicked, run the onSubmit function. */}
                <form onSubmit={onSubmit}>
                    <input
                        // Defines this input as a type where the user can type any character into it.
                        type='text'
                        // name is used with the formData state and onChange function.
                        name='email'
                        // value is the email key's value in the formData state, and is used with the onChange function.
                        value={email}
                        // This string displays if the input is empty.
                        placeholder='Enter your email'
                        // Whenever a character is added or deleted from the input, run the onChange function.
                        onChange={onChange}
                    />
                    <input
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={onChange}
                    />
                    <button>Submit</button>
                </form>
            </section>
        </div>
    );
}

export default Login;