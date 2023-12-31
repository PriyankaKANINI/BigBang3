import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import imageSrc1 from "../images/impressed-by-views-town_329181-13895.avif";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userEmail: "",
    passwordClear: "",
  });

  var fetchTravelAgentStatus = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:5170/api/User/GetAllAgents/allAgents`
      );
      const travelAgents = await response.json();

      const matchingAgent = travelAgents.find(
        (agent) => agent.user.userID === userID
      );

      if (matchingAgent) {
        if (matchingAgent.isVerified === "Not Approved") {
          return "Not Approved";
        } else {
          return "Approved";
        }
      } else {
        return "Invalid Credentials";
      }
    } catch (error) {
      console.log(error);
      return "Error";
    }
  };

  const handleLogin = () => {
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
        if (response.status === 200) {
          // ...
          toast.success("Logged In Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          const data = await response.json();

          if (data.userRole === "Admin") {
            navigate("/adminHome");
          } else if (data.userRole === "Agent") {
            navigate("/agentHome");
          } else if (data.userRole === "Traveler") {
            navigate("/bookingMain");
          }
          localStorage.setItem("userId", data.userID);
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.userEmail);
          localStorage.setItem("role", data.userRole);
        } else {
          const errorData = await response.json();
          if (response.status === 401) {
            toast.error(`Unauthorized: ${errorData.message}`);
          } else {
            toast.error(`Login failed: ${errorData.message}`);
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
