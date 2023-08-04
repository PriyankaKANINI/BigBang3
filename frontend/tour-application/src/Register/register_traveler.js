import React, { useState } from "react";
import "./register_traveler.css";
import imageSrc1 from "../images/impressed-by-views-town_329181-13895.avif";

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
          alert("Traveler registered successfully");
          console.log(responseData);
        } else {
          if (responseData.message === "Email already registered") {
            alert("This email is already registered as a traveler.");
          } else {
            console.log("Registration failed:", responseData.message);
          }
        }
      })
      .catch((error) => {
        console.error("An error occurred during registration:", error);
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
            <input
              type="number"
              placeholder="Phone Number"
              name="phone"
              value={travelerData.phone}
              onChange={handleChange}
            />
            <textarea
              placeholder="Address"
              name="address"
              value={travelerData.address}
              onChange={handleChange}
            ></textarea>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={travelerData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Nationality"
              name="nationality"
              value={travelerData.nationality}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="passwordClear"
              value={travelerData.passwordClear}
              onChange={handleChange}
              required
            />
            <div className="register-button">
              <button className="register-item-button" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTraveler;
