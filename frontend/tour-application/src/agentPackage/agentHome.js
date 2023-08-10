import React from "react";
import "../agentPackage/agentHome.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import the toast function

const AgentHome = () => {
  const navigate = useNavigate(); // Add parentheses here
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast.info("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <nav className="agentPabeNav-nav-agent">
      <ul>
        <li>
          <Link to="#" className="agentPageNavAA">
            Home
          </Link>
        </li>
        <li>
          <Link to="/package">Package</Link>
        </li>
        <li>
          <a href="#" onClick={handleLogout}>
            Log Out
          </a>
        </li>
      </ul>

      <h2 id="welcome-admin">Welcome Back, Agent</h2>
    </nav>
  );
};

export default AgentHome;
