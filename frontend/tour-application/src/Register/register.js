import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import imageSrc1 from "../images/impressed-by-views-town_329181-13895.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ onRegistrationSuccess }) => {
  const [agentData, setAgentData] = useState({
    agentName: "",
    email: "",
    phoneNumber: "",
    address: "",
    companyName: "",
    companyRegistrationNumber: "",
    passwordClear: "",
  });
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    // Validate input fields before submitting
    if (
      !agentData.agentName ||
      !agentData.email ||
      !agentData.phoneNumber ||
      !agentData.address ||
      !agentData.companyName ||
      !agentData.companyRegistrationNumber ||
      !agentData.passwordClear
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      // Check if the email is already registered
      const emailExistsResponse = await fetch(
        `http://localhost:5170/api/User/CheckEmailExistence?email=${agentData.email}`
      );
      const emailExistsData = await emailExistsResponse.json();

      if (emailExistsData.exists) {
        toast.error("This email is already registered.");
        return;
      }

      // If email doesn't exist, proceed with registration
      const response = await fetch(
        "http://localhost:5170/api/User/AgentRegister/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agentData),
        }
      );

      if (response.ok) {
        toast.success("Agent registered successfully");
        onRegistrationSuccess();
        navigate("/");
      } else {
        const responseData = await response.json();
        if (responseData.message === "User already registered") {
          toast.error("You are already registered as an agent.");
        } else {
          console.log("Registration failed:", responseData.message);
        }
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
    navigate("/");
  };
  return (
    <div className="register-container-agent">
      <div className="register-item-agent">
        <div className="register-leftright-agent">
          <div className="register-image-agent">
            <img src={imageSrc1} alt="Your Image" />
          </div>
          <div className="register-inputs-agent">
            <div className="register-inputs-content-agent">
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
            </div>
            <div className="register-inputs-content">
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
            </div>
            <div className="register-inputs-content">
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
            </div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="passwordClear"
              required
              value={agentData.passwordClear}
              onChange={handleChange}
            />
            <div className="register-button-agent">
              <button
                className="register-item-button-agent"
                onClick={handleSubmit}
              >
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
