import React, { useState } from "react";
import "./Itinerary.css";
import AgentHome from "./agentHome";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const Itinerary = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dayandVisit: "",
    destinationName: "",
    destinationDescription: "",
    images: [],
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({ ...prevState, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!packageId) {
      alert(
        "Invalid package details. Please submit the package details first."
      );
      return;
    }

    const itineraryDetails = {
      packageId: packageId,
      dayandVisit: formData.dayandVisit,
      destinationName: formData.destinationName,
      destinationDescription: formData.destinationDescription,
    };

    try {
      const response = await fetch(
        "http://localhost:5202/api/Itinerary/createItinerary",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itineraryDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Error submitting itinerary details.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("packageId", packageId);

      formData.images.forEach((image) => {
        formDataToSend.append("Image", image);
      });

      const imageUploadResponse = await fetch(
        `http://localhost:5234/api/TourImage/PostingImages?packageId=${packageId}`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!imageUploadResponse.ok) {
        throw new Error("Error uploading images.");
      }

      setModalIsOpen(true);
      setFormData({
        dayandVisit: "",
        destinationName: "",
        destinationDescription: "",
        images: [],
      });
    } catch (error) {
      console.error("Error submitting itinerary details and images:", error);
      alert("Error submitting itinerary details and images. Please try again.");
    }
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  return (
    <div className="pack-nav-main">
      <div className="pack-nav">
        <AgentHome />
      </div>
      <div className="itinerary-form-container">
        <h2>Itinerary Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group required">
            <label htmlFor="dayandVisit">Day and Visit</label>
            <input
              type="text"
              id="dayandVisit"
              name="dayandVisit"
              value={formData.dayandVisit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group required">
            <label htmlFor="destinationName">Famous Place</label>
            <input
              type="text"
              id="destinationName"
              name="destinationName"
              value={formData.destinationName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group required">
            <label htmlFor="destinationDescription">Description</label>
            <input
              type="text"
              id="destinationDescription"
              name="destinationDescription"
              value={formData.destinationDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group required">
            <label htmlFor="images">Upload Images</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>
          <input type="submit" value="Submit Itinerary Details and Images" />
        </form>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
        <h2>Submitted</h2>
        <p>All details submitted successfully!</p>
        <button onClick={handleModalClose}>Close</button>
      </Modal>
    </div>
  );
};

export default Itinerary;
