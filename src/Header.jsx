import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles/Header.css'

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin'; // Replace with your logic to determine admin status
  const { id } = useParams();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={`/users/profile/${id}`} >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/events" >
                      Events
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/vendors" >
                      Vendors
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/budgets" >
                      Budgets
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/bookings">
                      Bookings
                    </Link>
                  </li>
                  {isAdmin && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/allUsers">
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
                    <Link className="nav-link" to="/bookings/create" >
                      Create Booking
                    </Link>
                  </li>
                  <li className="nav-item">
                    
                    <button
                      className="btn btn-logout"
                      onClick={handleLogout}
                     
                    >
                      Logout
                    </button>
                  </li>
              
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" >
                      Register
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
