import React from "react";
import "./register.css";
import imageSrc1 from "../images/impressed-by-views-town_329181-13895.avif";

// front-view-smiley-woman-bridge-with-sunglasses-while-traveling_23-2148648625.avif

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-item">
        <h2>Register</h2>
        <div className="register-leftright">
          <div className="register-image">
            <img src={imageSrc1} alt="Your Image" />
          </div>
          <div className="register-inputs">
            <input type="text" placeholder="Name" id="name" required />
            <input type="number" placeholder="Age" id="age" required />
            <input type="date" placeholder="DOB" id="dob" required />
            <select defaultValue="select" id="select">
              <option disabled value="select">
                Select
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input type="number" placeholder="Phone Number" id="number" />
            <textarea placeholder="Address" id="textarea-register"></textarea>
            <input type="email" placeholder="Email" id="email" required />
            <input
              type="password"
              placeholder="Password"
              id="password"
              required
            />
            <div className="register-button">
              <button className="register-item-button">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
