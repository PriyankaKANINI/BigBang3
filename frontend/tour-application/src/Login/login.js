import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-item">
        <h2>Login</h2>
        <div className="login-inputs">
          <input type="email" placeholder="Email" id="email" required />
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
          />
          <button className="login-item-button">Login</button>
        </div>
        <div className="login-footer">
          <Link to="/" className="forgot-password">
            Forgot Password?
          </Link>
          <Link to="/register" className="register-footer">
            New here? Register with us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
