import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    let navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from URL parameters

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });
    const [error, setError] = useState(""); // State to hold error messages

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        console.log("ID from useParams:", id);
        if (id) {
            loadUser();
        }
    }, [id]); // Reload user data when 'id' changes

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = async (e) => {
        e.preventDefault();

        // Basic validation: Check if all fields are filled
        if (!name || !username || !email) {
            setError('All fields are required.');
            return;
        }

        // Email validation
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            await axios.put(`http://localhost:8080/user/${id}`, user);
            navigate("/");
        } catch (error) {
            console.error('There was an error updating the user!', error);
            setError('Failed to update user.');
        }
    };

    const handleCancel = () => {
        // Reset form data
        setUser({ name: '', username: '', email: '' });
        // Navigate to the home page or another route
        navigate('/');
    };

    const loadUser = async () => {
        try {
            // Ensure id is correctly passed in the URL
            const result = await axios.get(`http://localhost:8080/users/${id}`);
            console.log('User data loaded:', result.data); // Debugging output
            setUser(result.data); // Set the data to state
        } catch (error) {
            console.error('Error loading user data:', error);
            setError('Failed to load user data.');
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit User</h2>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="name" className='form-label'>Name</label>
                            <input 
                                type="text"
                                className='form-control'
                                placeholder='Enter your name'
                                name='name' 
                                id='name'
                                value={name} 
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="username" className='form-label'>Username</label>
                            <input 
                                type="text"
                                className='form-control'
                                placeholder='Username here'
                                name='username' 
                                id='username'
                                value={username} 
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="email" className='form-label'>Email Id</label>
                            <input 
                                type="text"
                                className='form-control'
                                placeholder='Your Email Id here'
                                name='email' 
                                id='email'
                                value={email} 
                                onChange={onInputChange}
                            />
                        </div>

                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <button type="button" onClick={handleCancel} className='btn btn-outline-danger mx-2'>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
