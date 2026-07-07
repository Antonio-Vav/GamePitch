import React, { useState } from 'react';
import { fetchData } from '../utils/fetchData';

function LoginForm({ onAuthSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await fetchData('/users/login', 'POST', { username, password });
            
            // Pass the logged in user details up to App.jsx state
            onAuthSuccess(data.user);
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="card p-4 shadow bg-dark text-white border-secondary card-primary">
            <h3 className="text-center mb-4 text-primary fw-bold">Sign In</h3>
            
            {error && <div className="alert alert-danger p-2 small text-center">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label text-muted small">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="form-label text-muted small">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;