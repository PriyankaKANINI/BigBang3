import React, { useState } from "react";
import "./package.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ContactDetailsPage from "./contactDetailsPage";
import Modal from "react-modal"; // Import the react-modal library
import AgentHome from "./agentHome";

const Package = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    packageName: "",
    travelAgencyName: "",
    description: "",
    rate: "",
    destination: "",
    departurePoint: "",
    // startDate: "",
    // endDate: "",
    arrivalPoint: "",
    availablityCount: "",
    totalDays: "",
    transportation: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [packageId, setPackageId] = useState(null);
  const [formErrors, setFormErrors] = useState({
    packageName: "",
    travelAgencyName: "",
    description: "",
    rate: "",
    destination: "",
    departurePoint: "",
    arrivalPoint: "",
    availablityCount: "",
    totalDays: "",
    transportation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    navigate(`/contactDetailsForm/${packageId}`);
  };
  const handleStartDateChange = (date) => {
    setFormData((prevState) => ({ ...prevState, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    setFormData((prevState) => ({ ...prevState, endDate: date }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = { ...formErrors };
    let hasErrors = false;
    for (const field in formData) {
      if (
        typeof formData[field] === "string" &&
        formData[field].trim() === ""
      ) {
        errors[field] = "This field is required";
        hasErrors = true;
      } else {
        errors[field] = "";
      }
    }
    setFormErrors(errors);

    if (hasErrors) {
      alert("Please fill in all required fields.");
      return;
    }

    fetch("http://localhost:5202/api/Package/packageCreate", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPackageId(data.packageId);
        handleModalOpen();
      })
      .catch((error) => {
        console.error("Error creating package:", error);
        alert("Error creating package. Please try again.");
      });
  };

  const handleSubmitContactDetails = (contactDetails) => {
    fetch("http://localhost:5202/api/ContactDetails/createContact", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Contact details submitted:", data);
        alert("Contact details submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting contact details:", error);
        alert("Error submitting contact details. Please try again.");
      });
  };

  return (
    <div>
      <div className="pack-nav">
        <AgentHome />
      </div>
      <div className="package-form-container">
        <h2>Travel Package Form</h2>
        <div className="package-form-content-1">
          <div className="form-group required">
            <input
              id="packageName"
              name="packageName"
              label="Package Name"
              variant="outlined"
              value={formData.packageName}
              onChange={handleChange}
              required
              placeholder="Package Name"
            />
          </div>

          <div className="form-group required">
            <input
              id="travelAgencyName"
              name="travelAgencyName"
              label="Travel Agency Name"
              variant="outlined"
              value={formData.travelAgencyName}
              onChange={handleChange}
              required
              placeholder="Agency Name"
            />
          </div>
        </div>
        <div className="package-form-content-2">
          <div className="form-group required">
            <input
              id="destination"
              name="destination"
              label="Destination"
              variant="outlined"
              value={formData.destination}
              onChange={handleChange}
              required
              placeholder="Destination Name"
            />
          </div>
          <div className="form-group required">
            <input
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Description"
            />
          </div>
        </div>
        <div className="package-form-content-3">
          <div className="form-group required">
            <input
              id="totalDays"
              name="totalDays"
              label="Total Days"
              type="number"
              variant="outlined"
              value={formData.totalDays}
              onChange={handleChange}
              required
              placeholder="Total days"
            />
          </div>

          <div className="form-group required">
            <input
              id="rate"
              name="rate"
              label="Rate"
              type="number"
              step="0.01"
              variant="outlined"
              value={formData.rate}
              onChange={handleChange}
              required
              placeholder="Price"
            />
          </div>
        </div>

        <div className="package-form-content-4">
          <div className="form-group required">
            <DatePicker
              id="startDate"
              name="startDate"
              selected={formData.startDate}
              onChange={handleStartDateChange}
              required
              placeholderText="Start Date"
              className="date-picker-input"
              minDate={new Date()}
            />
          </div>
          <div className="form-group required">
            <DatePicker
              id="endDate"
              name="endDate"
              selected={formData.endDate}
              onChange={handleEndDateChange}
              required
              placeholderText="End Date"
              className="date-picker-input"
              minDate={formData.startDate}
            />
          </div>
        </div>

        <div className="package-form-content-5">
          <div className="form-group required">
            <input
              id="departurePoint"
              name="departurePoint"
              label="Departure Point"
              variant="outlined"
              value={formData.departurePoint}
              onChange={handleChange}
              required
              placeholder="Departure point"
            />
          </div>
          <div className="form-group required">
            <input
              id="arrivalPoint"
              name="arrivalPoint"
              label="Arrival Point"
              variant="outlined"
              value={formData.arrivalPoint}
              onChange={handleChange}
              required
              placeholder="Arrival point"
            />
          </div>
        </div>

        <div className="package-form-content-6">
          <div className="form-group required">
            <input
              id="transportation"
              name="transportation"
              label="Transport Details"
              variant="outlined"
              value={formData.transportation}
              onChange={handleChange}
              required
              placeholder="Transportation"
            />
          </div>
          <div className="form-group required">
            <input
              id="availablityCount"
              name="availablityCount"
              label="Availability Count"
              type="number"
              variant="outlined"
              value={formData.availablityCount}
              onChange={handleChange}
              required
              placeholder="Availability count"
            />
          </div>
        </div>
        <div className="package-form-buttons">
          <div className="package-form-button-cancel">
            <button
              type="reset"
              onClick={() => navigate("/cancel-route")}
              className="responsive-button"
            >
              Cancel
            </button>
          </div>
          <div className="package-form-button-submit">
            <button
              type="submit"
              onClick={handleSubmit}
              className="responsive-button"
            >
              Submit
            </button>
          </div>
        </div>
        {/* Modal */}
        <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
          <h2>Success</h2>
          <p>
            Your details have been recorded. You can move on to the next page.
          </p>
          <button onClick={handleModalClose}>Next</button>
        </Modal>
      </div>

      {/* {submitted && packageId && <ContactDetailsPage packageId={packageId} />} */}
    </div>
  );
};

export default Package;
