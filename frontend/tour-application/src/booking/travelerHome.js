import React from "react";
import "../booking/travelerHome.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TravelerHome = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/");
  };
  return (
    <nav className="agentPabeNav-nav">
      <ul>
        <li>
          <Link to="/" className="agentPageNavAA">
            Home
          </Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <a href="#" onClick={handleLogout}>
            Log Out
          </a>
        </li>
      </ul>

      <h2 id="welcome-admin">Hey, Traveler</h2>
    </nav>
  );
};

export default TravelerHome;
