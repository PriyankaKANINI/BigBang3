import React from "react";
import "../booking/travelerHome.css";
import { Link, useNavigate } from "react-router-dom";

const TravelerHome = () => {
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

      <h2 id="welcome-admin">Welcome Back, Traveler</h2>
    </nav>
  );
};

export default TravelerHome;
