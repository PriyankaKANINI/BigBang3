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
    // Check if email and password are not empty
    if (!loginData.userEmail || !loginData.passwordClear) {
      alert("Please enter your email and password");
      return;
    }
    fetch("http://localhost:5170/api/User/Login/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...loginData }),
    })
      .then(async (response) => {
        if (response.status == 200) {
          alert("Logged In Successfully");
          const data = await response.json();
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.userEmail);

          setLoginData((prevLoginData) => ({
            ...prevLoginData,
            userRole: data.userRole,
          }));

          // Redirect based on user role
          if (data.userRole === "Admin") {
            navigate("/adminHome");
          } else if (data.userRole === "Agent") {
            navigate("/package");
          } else if (data.userRole === "Traveler") {
            navigate("/bookingMain");
          }
        } else {
          // Handle unsuccessful login
          const errorData = await response.json();
          if (response.status === 401) {
            alert(`Unauthorized: ${errorData.message}`);
          } else {
            alert(`Login failed: ${errorData.message}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
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
