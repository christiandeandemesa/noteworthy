// This file is the Dashboard component.

import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Dashboard() {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        // If a user is not logged in, redirect to the login page.
        if(!user) navigate('/login');
    }, [user, navigate]);

    return (
        <div>Dashboard</div>
    );
}

export default Dashboard;