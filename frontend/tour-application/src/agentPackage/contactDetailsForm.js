import React, { useState } from "react";
import "./contactDetailsForm.css";
import { useParams, useNavigate } from "react-router-dom";
import AgentHome from "./agentHome";
import Modal from "react-modal"; // Import the react-modal library

const ContactDetailsForm = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    travelAgentName: "",
    phone: "",
    email: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false); // Add this state for modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handleChange:", name, value); // Add this line
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!packageId) {
      alert(
        "Invalid package details. Please submit the package details first."
      );
      return;
    }

    const contactDetails = {
      packageId: packageId,
      travelAgentName: formData.travelAgentName,
      phone: formData.phone,
      email: formData.email,
    };

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

        // Open the modal after successful contact details submission
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.error("Error submitting contact details:", error);
        alert("Error submitting contact details. Please try again.");
      });
  };
  const handleModalClose = () => {
    // Close the modal and navigate to the itinerary page
    setModalIsOpen(false);
    navigate(`/Itinerary/${packageId}`);
  };
  return (
    <div className="contact-form-container">
      <h2>Contact Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group required">
          <label htmlFor="agentName">Agent Name</label>
          <input
            type="text"
            id="agentName"
            name="travelAgentName"
            value={formData.travelAgentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="agentPhoneNo">Agent Phone Number</label>
          <input
            type="tel"
            id="agentPhoneNo"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="agentEmail">Agent Email</label>
          <input
            type="text"
            id="agentEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Submit Contact Details" />
      </form>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
        <h2>Contact Details Submitted</h2>
        <p>Contact details have been submitted successfully!</p>
        <button onClick={handleModalClose}>Next</button>
      </Modal>
    </div>
  );
};

export default ContactDetailsForm;
