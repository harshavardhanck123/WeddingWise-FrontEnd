import React, { useState } from 'react';
import userServices from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css'; // Importing CSS file for styling

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    userServices.register(name, email, password, role)
      .then(response => {
        alert('Registration Successful');

        setName('');
        setEmail('');
        setPassword('');
        setRole('');

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
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
          <input
            type="text"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>
    </div>
  );
};

export default Register;
