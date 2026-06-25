import React from 'react';

function LoginForm() {
  return (
    <div className="card p-4 shadow-sm custom-card">
      <h3 className="text-center mb-4 text-primary fw-bold">Sign In</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input type="text" className="form-control" placeholder="Enter username" />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-bold mt-2">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;