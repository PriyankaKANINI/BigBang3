import React from "react";
import "../adminHome/adminHome.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminHome = () => {
  const navigate = useNavigate();
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
    <div className="adminHome-main">
      <nav className="adminPabeNav-nav">
        <ul>
          <li>
            <Link to="/" className="adminPageNavAA">
              Home
            </Link>
          </li>
          <li>
            <Link to="/request">Request</Link>
          </li>
          <li>
            <Link to="/status">Status</Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              Log Out
            </a>
          </li>
        </ul>

        <h2 id="welcome-admin">Welcome Back, Admin</h2>
      </nav>
    </div>
  );
};

export default AdminHome;
