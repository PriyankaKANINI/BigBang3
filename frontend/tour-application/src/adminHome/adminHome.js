import React from "react";
import "../adminHome/adminHome.css";
import { Link, useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate(); // Add parentheses here
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="adminPabeNav-nav">
      <ul>
        <li>
          <Link to="/adminDashboard" className="adminPageNavAA">
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
  );
};

export default AdminHome;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logoImage from "../images/logo_img-removebg-preview.png";
// import "../adminHome/adminHome.css";

// const AdminHome = () => {
//   return (
//     <div className="adminHome-container-1">
//       <nav className="navbar admin-navbar-expand-lg navbar-dark">
//         <div className="container">
//           <Link to="/" className="navbar-brand">
//             Travel Co.
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link">
//                   Home
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link to="request" className="nav-link">
//                   Request
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <button className="logout-button">Logout</button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <div className="adminHome-container-2">
//         <div className="adminHome-content-2">Hello Admin, Welcome Back</div>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;
