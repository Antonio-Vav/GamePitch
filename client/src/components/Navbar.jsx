import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <a className="navbar-brand fw-bold text-success" href="#">GamePitch</a>
      <div className="ms-auto">
        <ul className="navbar-nav flex-row gap-4">
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Register</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;