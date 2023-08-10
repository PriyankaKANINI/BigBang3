import React, { useState } from "react";
import "./register.css";
import imageSrc1 from "../images/impressed-by-views-town_329181-13895.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterTraveler = () => {
  const [travelerData, setTravelerData] = useState({
    travelerName: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    nationality: "",
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
      default:
        updatedValue = type === "checkbox" ? checked : value;
    }

    setTravelerData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = () => {
    // Validate input fields before submitting
    if (
      travelerData.travelerName === "" ||
      travelerData.age === "" ||
      travelerData.dateOfBirth === "" ||
      travelerData.gender === "" ||
      travelerData.email === "" ||
      travelerData.passwordClear === ""
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Check if the email is already registered
    fetch(
      `http://localhost:5170/api/User/CheckEmailExistence?email=${travelerData.email}`
    )
      .then(async (response) => {
        const responseData = await response.json();
        if (responseData.exists) {
          toast.error("This email is already registered as a traveler.");
        } else {
          // Email is not registered, proceed with registration
          fetch("http://localhost:5170/api/User/TravelerRegister/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(travelerData),
          })
            .then(async (response) => {
              const responseData = await response.json();
              if (response.ok) {
                toast.success("Traveler registered successfully");
                console.log(responseData);
              } else {
                console.log("Registration failed:", responseData.message);
                toast.error("Traveler registration failed. Please try again.");
              }

              navigate("/");
            })
            .catch((error) => {
              console.error("An error occurred during registration:", error);
              toast.error("An error occurred during registration.");
            });
        }
      })
      .catch((error) => {
        console.error(
          "An error occurred while checking email existence:",
          error
        );
        toast.error("An error occurred while checking email existence.");
      });
  };

  return (
    <div className="register-container-agent">
      <div className="register-item-agent">
        <div className="register-leftright-agent">
          <div className="register-image-traveler">
            <img src={imageSrc1} alt="Your Image" />
          </div>
          <div className="register-inputs-agent">
            <div className="input-row-agent">
              <input
                type="text"
                placeholder="Name"
                name="travelerName"
                value={travelerData.travelerName}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={travelerData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-inputs-content">
              <input
                type="date"
                placeholder="DOB"
                name="dateOfBirth"
                value={travelerData.dateOfBirth}
                onChange={handleChange}
                required
              />
              <select
                name="gender"
                value={travelerData.gender}
                onChange={handleChange}
                defaultValue="select"
                required
              >
                <option disabled value="select">
                  Select
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="register-inputs-content">
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                value={travelerData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Nationality"
                name="nationality"
                value={travelerData.nationality}
                onChange={handleChange}
              />
            </div>
            <div className="register-inputs-content">
              <textarea
                placeholder="Address"
                name="address"
                value={travelerData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="register-inputs-content">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={travelerData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-inputs-content">
              <input
                type="password"
                placeholder="Password"
                name="passwordClear"
                value={travelerData.passwordClear}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-button-agent">
              <button
                className="register-item-button-agent"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
            <div className="signin-section-agent">
              <p>Already have an account? Sign in</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterTraveler;
