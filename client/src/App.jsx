import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage'; 
import { fetchData } from './utils/fetchData';
import './App.css';

function App() {
    // Custom states for routing and session management
    const [currentPage, setCurrentPage] = useState('login'); 
    const [user, setUser] = useState(null);
    const [userIdeas, setUserIdeas] = useState([]);

    // Automatically fetch user's game ideas when they log in
    useEffect(() => {
        if (user) {
            fetchUserIdeas();
        } else {
            setUserIdeas([]);
        }
    }, [user]);

    const fetchUserIdeas = async () => {
        try {
            const ideas = await fetchData(`/games/user/${user._id}`, 'GET');
            setUserIdeas(ideas);
        } catch (err) {
            console.error("Failed to load game ideas:", err.message);
        }
    };

    // Callback when user successfully logs in or registers
    const handleAuthSuccess = (userData) => {
        setUser(userData);
        setCurrentPage('profile');
    };

    // Logout callback
    const handleLogout = () => {
        setUser(null);
        setCurrentPage('login');
    };

    return (
        <div className="app-container min-vh-100 bg-dark text-white">
            {/* 1. Top Functional Navbar */}
            <Navbar 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                user={user} 
                onLogout={handleLogout} 
            />

            {/* 2. Main Dashboard Layout */}
            <div className="container my-5">
                {/* Keeps header elements visible for Login and Register pages */}
                {currentPage !== 'profile' && (
                    <header className="text-center mb-5">
                        <h1 className="display-4 fw-bold text-white">Welcome to GamePitch</h1>
                        <p className="lead text-light">Manage, prototype, and showcase your project ideas seamlessly.</p>
                    </header>
                )}

                {/* Custom Front end State Routing Switch */}
                <div className="row justify-content-center align-items-start g-4">
                    {currentPage === 'login' && (
                        <div className="col-md-5">
                            <LoginForm onAuthSuccess={handleAuthSuccess} />
                        </div>
                    )}

                    {currentPage === 'register' && (
                        <div className="col-md-5">
                            <RegisterForm onAuthSuccess={handleAuthSuccess} />
                        </div>
                    )}
                </div>

                {/* Profile Page takes over the main screen when logged in */}
                {currentPage === 'profile' && user && (
                    <ProfilePage 
                        user={user} 
                        ideas={userIdeas} 
                        refreshIdeas={fetchUserIdeas} 
                    />
                )}
            </div>
        </div>
    );
}

export default App;
