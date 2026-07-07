import React from 'react';

function Navbar({ currentPage, setCurrentPage, user, onLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary px-4">
            <div className="container-fluid">
                {/* primary blue themed logo */}
                <a 
                    className="navbar-brand fw-bold fs-3 text-white" 
                    href="#" 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        setCurrentPage(user ? 'profile' : 'login'); 
                    }}
                >
                    Game<span className="text-primary">Pitch</span>
                </a>
                
                <div className="d-flex align-items-center ms-auto">
                    {user ? (
                        <>
                            {/* High contrast welcome message */}
                            <span className="text-light me-3">
                                Welcome, <strong className="text-success">{user.username}</strong>
                            </span>
                            <button 
                                className="btn btn-outline-danger btn-sm fw-bold px-3"
                                onClick={onLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* navigation text links */}
                            <button 
                                className={`btn btn-link nav-link me-3 mb-0 p-0 fw-bold ${currentPage === 'login' ? 'text-white' : 'text-lightOpacity'}`}
                                onClick={() => setCurrentPage('login')}
                                style={{ textDecoration: 'none', color: currentPage === 'login' ? '#ffffff' : '#a0a0a0' }}
                            >
                                Login
                            </button>
                            <button 
                                className={`btn btn-link nav-link mb-0 p-0 fw-bold ${currentPage === 'register' ? 'text-white' : 'text-lightOpacity'}`}
                                onClick={() => setCurrentPage('register')}
                                style={{ textDecoration: 'none', color: currentPage === 'register' ? '#ffffff' : '#a0a0a0' }}
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;