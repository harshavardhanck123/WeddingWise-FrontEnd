import React, { useState } from "react";
import userServices from "../../services/userServices";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Login.css"; // Importing CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await userServices.login(email, password);
      setLoading(false);
      localStorage.setItem("token", userData.token);
      localStorage.setItem("role", userData.user.role);
      localStorage.setItem("userId", userData.user.id);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            id="login-img"
            src="https://res.cloudinary.com/de0mhfxog/image/upload/v1719939552/weddingwise/rr67iq5yo0ssc8hqqwnu.jpg"
            alt="Login"
          />
        </div>
        <div className="col-md-6">
          <div className="login-div">
            <h3 className="text-center">Login</h3>
            <p className="text-center">
              Not have any account? <span><Link to="/register">Sign Up</Link></span>
            </p>
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
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
