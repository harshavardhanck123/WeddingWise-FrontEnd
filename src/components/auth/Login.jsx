import React, { useState } from 'react';
import userServices from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css'; // Importing CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await userServices.login(email, password);
      setLoading(false);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('role', userData.user.role);  
      localStorage.setItem('userId', userData.user.id);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
