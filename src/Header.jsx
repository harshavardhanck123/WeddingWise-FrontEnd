import React from 'react';
import { Link, useNavigate,NavLink } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin'; // Replace with your logic to determine admin status
  const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage after login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" id="Hover" to="/">
            WeddingWise
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <NavLink className="nav-link" id="Hover" to="/events">
                  Events
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" id="Hover" to="/vendors">
                  Vendors
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" id="Hover" to="/budgets">
                  Budgets
                </NavLink>
              </li>
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" id="Hover" to={`/users/profile/${userId}`}>
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link"  id="Hover" to="/bookings">
                      Bookings
                    </Link>
                  </li>
                  {isAdmin && (
                    <li className="nav-item">
                      <Link className="nav-link"  id="Hover" to="/allUsers">
                        Users
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
            <ul className="navbar-nav">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" id="Hover" to="/bookings/create">
                      Create Booking
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-logout" id="Hover" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
              <li className="nav-item">
                    <Link className="nav-link" id="Hover" to="/login">
                      <button className='head-login-btn'>Login</button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" id="Hover" to="/register">
                      <button className='head-register-btn'>Register</button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
