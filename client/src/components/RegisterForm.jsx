import React from 'react';

function RegisterForm() {
  return (
    <div className="card p-4 shadow-sm custom-card">
      <h3 className="text-center mb-4 text-success fw-bold">Create Account</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input type="text" className="form-control" placeholder="e.g. First Name, Last Name" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input type="text" className="form-control" placeholder="Choose a username" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input type="email" className="form-control" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input type="password" className="form-control" placeholder="Create strong password" />
        </div>
        <button type="submit" className="btn btn-success w-100 fw-bold mt-2">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;