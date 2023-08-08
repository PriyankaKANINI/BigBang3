import React from "react";
import "../agentPackage/agentHome.css";
import { Link, useNavigate } from "react-router-dom";

const AgentHome = () => {
  const navigate = useNavigate(); // Add parentheses here
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="agentPabeNav-nav">
      <ul>
        <li>
          <Link to="#" className="agentPageNavAA">
            Home
          </Link>
        </li>
        {/* <li>
          <Link to="/request">Request</Link>
        </li>
        <li>
          <Link to="/status">Status</Link>
        </li> */}
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
