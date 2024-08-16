import React, { useState } from 'react';
import userServices from '../../services/userServices';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Register.css'; // Importing CSS file for styling

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    userServices.register(name, email, password, selectedRole)
      .then(response => {
        alert('Registration Successful');
        setName('');
        setEmail('');
        setPassword('');
        setSelectedRole('');
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch(error => {
        setError('Registration Failed');
        console.error('Error registering user:', error);
      });
  };

  return (
    <div className="register-container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            id="register-img"
            src="https://res.cloudinary.com/de0mhfxog/image/upload/v1719917133/spsnddctvysdxmrsntdj.jpg"
            alt=".."
          />
        </div>
        <div className="col-md-6">
          <div className="register-container-inner">
            <h3>Register</h3>
            <p>Already have an account? <span><Link to="/login">Sign In</Link></span></p>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select
                  name="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  required
                  className="form-control"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="register-btn">Register</button>
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
