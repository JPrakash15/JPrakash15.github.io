import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(""); // State to hold feedback messages

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/users/${id}`);
            setMessage(`User with ID ${id} has been successfully deleted.`);
            loadUsers(); // Reload the list of users
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('Failed to delete user. Please try again.');
        }
    }

    return (
        <div className='container'>
            <div className='py-4'> 
            {message && <div className='alert alert-info'>{message}</div>}
            <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="col">ID No</th>
                    <th scope="col">Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>View</Link>
                                    <Link className='btn btn-outline-primary mx-2'
                                    to={`/edituser/${user.id}`}
                                    >Edit</Link>
                                    <button className='btn btn-danger mx-2'
                                    onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}
