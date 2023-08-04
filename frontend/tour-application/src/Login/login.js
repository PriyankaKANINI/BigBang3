import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import imageSrc1 from "../images/impressed-by-views-town_329181-13895.avif";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userEmail: "",
    passwordClear: "",
  });

  const handleLogin = () => {
    fetch("http://localhost:5170/api/User/Login/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(async (response) => {
        if (response.ok) {
          alert("Logged In Successfully");
          const data = await response.json();
          console.log(data);

          switch (data.userRole) {
            case "admin":
              navigate("/admin");
              break;
            case "agent":
              navigate("/agent");
              break;
            case "traveler":
              navigate("/traveler");
              break;
            default:
              navigate("/");
              break;
          }
        } else {
          const errorData = await response.json();
          alert(`Login failed: ${errorData.message}`);
        }
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
        alert("An error occurred during login");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="login-item">
        <div className="login-leftright">
          <div className="login-image">
            <img src={imageSrc1} alt="Image" />
          </div>
          <div className="login-inputs">
            <input
              type="email"
              placeholder="Email"
              id="userEmail"
              name="userEmail"
              required
              value={loginData.userEmail}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="passwordClear"
              name="passwordClear"
              required
              value={loginData.passwordClear}
              onChange={handleChange}
            />
            <div className="login-footer">
              <Link to="/" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            <button className="login-item-button" onClick={handleLogin}>
              Login
            </button>
            <button className="login-item-button-2">
              <Link to="/register" className="login-footer-signup">
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
