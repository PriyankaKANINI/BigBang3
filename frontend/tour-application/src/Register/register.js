import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import imageSrc1 from "../images/impressed-by-views-town_329181-13895.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ onRegistrationSuccess }) => {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState({
    agentName: "",
    email: "",
    phoneNumber: "",
    address: "",
    companyName: "",
    companyRegistrationNumber: "",
    passwordClear: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue;

    switch (name) {
      case "phoneNumber":
        updatedValue = type === "checkbox" ? checked : value.replace(/\D/g, "");
        break;
      case "email":
        updatedValue = type === "checkbox" ? checked : value;
        break;
      case "companyRegistrationNumber":
        updatedValue = type === "checkbox" ? checked : value;
        break;
      default:
        updatedValue = type === "checkbox" ? checked : value;
    }

    setAgentData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = () => {
    fetch("http://localhost:5170/api/User/AgentRegister/register", {
      // ...your fetch and API call code
    })
      .then(async (response) => {
        const responseData = await response.json();
        if (response.ok) {
          toast.success("Agent registered successfully"); // Show success toast
          console.log(responseData);
          onRegistrationSuccess();
          navigate("/");
        } else {
          if (responseData.message === "User already registered") {
            toast.error("You are already registered as an agent."); // Show error toast
          } else {
            console.log("Registration failed:", responseData.message);
            toast.error("Agent registration failed. Please try again."); // Show error toast for other failures
          }
        }
      })
      .catch((error) => {
        console.error("An error occurred during registration:", error);
        toast.error("An error occurred during registration."); // Show error toast for catch block
      });
  };

  return (
    <div className="register-container">
      <div className="register-item">
        <div className="register-leftright">
          <div className="register-image">
            <img src={imageSrc1} alt="Your Image" />
          </div>
          <div className="register-inputs">
            <input
              type="text"
              placeholder="Agent Name"
              id="agentName"
              name="agentName"
              required
              value={agentData.agentName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              required
              value={agentData.email}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              value={agentData.phoneNumber}
              onChange={handleChange}
            />
            <textarea
              placeholder="Address"
              id="address"
              name="address"
              style={{ resize: "none" }}
              value={agentData.address}
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              placeholder="Company Name"
              id="companyName"
              name="companyName"
              value={agentData.companyName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Company Registration Number"
              id="companyRegistrationNumber"
              name="companyRegistrationNumber"
              value={agentData.companyRegistrationNumber}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="passwordClear"
              required
              value={agentData.passwordClear}
              onChange={handleChange}
            />
            <div className="register-button">
              <button className="register-item-button" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
