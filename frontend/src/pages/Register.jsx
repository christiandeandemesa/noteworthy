// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is the Register component.

import {useState, useEffect} from 'react';
// Imports useNavigate fromt the react-router-dom package.
import {useNavigate} from 'react-router-dom';
// Imports useSelector and useDispatch from the 'react-redux' package.
import {useSelector, useDispatch} from 'react-redux';
// Imports toast from the react-toastify package.
import {toast} from 'react-toastify';
// Imports the register thunk function and reset action creator function.
import {register, reset} from '../features/auth/authSlice';
// Imports the Spinner component.
import Spinner from '../components/Spinner';
// Imports all Ai react-icons.
import * as AiIcons from 'react-icons/ai';
import styles from './Register.module.scss';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {firstName, lastName, email, password, confirmPassword} = formData;

    // navigate runs the useNavigate() function.
    const navigate = useNavigate();
    // dispatch runs the useDispatch() function.
    const dispatch = useDispatch();

    // Destructures the variables from the authSlice state (state.auth) in the Redux store's state.
    const {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth);

    // This useEffect function will run when this component first renders.
    useEffect(() => {
        // If isError is true, display a toast error notification with the message from authSlice.
        if(isError) toast.error(message);
        // If isSuccess is true or a user is logged in, redirect to the dashboard page.
        if(isSuccess || user) navigate('/');
        // Dispatch authSlice's reset action creator function.
        dispatch(reset());
    // This useEffect function will also run if any of the below variables changes or runs.
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = e => {
        e.preventDefault();

        // If password and confirmPassword do not match, display a toast error notification with the below string.
        if(password !== confirmPassword) toast.error('Passwords do not match');
        // If password and confirmPassword do match, create a userData object holding the variables from the formData state.
        else {
            const userData = {
                firstName,
                lastName,
                email,
                password
            }
            // Dispatch authSlice's register thunk function with userData as the user argument.
            dispatch(register(userData));
        }
    }

    const onChange = e => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    }

    // If isLoading is true, return the Spinner component instead of the below return.
    if(isLoading) return <Spinner/>;

    return (
        <div id={styles.register}>
            <section id={styles.header}>
                <h1>
                    Register
                    {/* Example of using a specific AiIcion. */}
                    <AiIcons.AiOutlineLogin/>
                </h1>
                <p>Please create an account</p>
            </section>

            <section id={styles.login}>
                <form onSubmit={onSubmit}>
                    <div id={styles.form_group_one}>
                        <input
                            type='text'
                            name='firstName'
                            value={firstName}
                            placeholder='Enter your first name'
                            onChange={onChange}
                            className={styles.input_one}
                        />
                        <input
                            type='text'
                            name='lastName'
                            value={lastName}
                            placeholder='Enter your last name'
                            onChange={onChange}
                            className={styles.input_one}
                        />
                    </div>
                    <div id={styles.form_group_two}>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                            className={styles.input_two}
                        />
                        <input
                            type='password'
                            name='password'
                            value={password}
                            placeholder='Enter your password'
                            onChange={onChange}
                            className={styles.input_two}
                        />
                    </div>
                    <div id={styles.form_group_three}>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={confirmPassword}
                            placeholder='Confirm your password'
                            onChange={onChange}
                            className={styles.input_three}
                        />
                        <button>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Register;