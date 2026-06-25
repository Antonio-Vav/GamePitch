import React from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* 1. Top Navbar */}
      <Navbar />
      
      {/* 2. Main Dashboard Layout */}
      <div className="container my-5">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold text-white">Welcome to GamePitch</h1>
          <p className="lead text-light">Manage, prototype, and showcase your project ideas seamlessly.</p>
        </header>
        
        {/* Grids automatically stack */}
        <div className="row justify-content-center align-items-start g-4">
          <div className="col-md-5">
            <LoginForm />
          </div>
          <div className="col-md-5">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
