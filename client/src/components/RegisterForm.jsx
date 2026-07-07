import React, { useState } from 'react';
import { fetchData } from '../utils/fetchData';

function RegisterForm({ onAuthSuccess }) {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Send the registration payload to backend create handler
            const newUser = await fetchData('/users/register', 'POST', { 
                username, fullName, email, password 
            });
            
            // On success, automatically trigger session login state
            onAuthSuccess(newUser);
        } catch (err) {
            setError(err.message || 'Registration failed. Try a different username/email.');
        }
    };

    return (
        <div className="card p-4 shadow bg-dark text-white border-secondary">
            <h3 className="text-center mb-4 text-success fw-bold">Create Account</h3>
            
            {error && <div className="alert alert-danger p-2 small text-center">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label text-muted small">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. First Last"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label text-muted small">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label text-muted small">Email Address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="form-label text-muted small">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Create strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-success w-100 fw-bold py-2">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;