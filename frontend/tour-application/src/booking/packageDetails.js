import React, { useState, useEffect } from "react";
import "./packageDetails.css";

const PackageDetails = () => {
  const [images, setImages] = useState([]);
  const [contactDetails, setContactDetails] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  const selectedPackageId = localStorage.getItem("selectedPackageId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesResponse = await fetch(
          `http://localhost:5234/api/TourImage/GetTourImageByPackageId?packageId=${selectedPackageId}`
        );
        if (!imagesResponse.ok) {
          throw new Error("Network response for images was not ok");
        }
        const imagesData = await imagesResponse.json();
        console.log("Images data:", imagesData);
        setImages(imagesData);

        const contactResponse = await fetch(
          "http://localhost:5202/api/ContactDetails/getAllContact"
        );
        if (!contactResponse.ok) {
          throw new Error("Network response for contact details was not ok");
        }
        const contactData = await contactResponse.json();
        setContactDetails(contactData);

        const itineraryResponse = await fetch(
          "http://localhost:5202/api/Itinerary/getAllItinerary"
        );
        if (!itineraryResponse.ok) {
          throw new Error("Network response for itinerary was not ok");
        }
        const itineraryData = await itineraryResponse.json();
        setItinerary(itineraryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedPackageId]);

  return (
    <div className="package-details-container">
      <div className="card-package-content">
        <h3 className="card-title-package">Images</h3>
        <div className="card-package-content">
          {images.map((image) => (
            <img key={image.id} src={image.imagePath} alt={image.name} />
          ))}
        </div>
      </div>
      <div className="card-package-content">
        <h3 className="card-title-package">Contact Details</h3>
        <div className="card-package-content">
          {contactDetails.map((contact) => (
            <div key={contact.contactId}>
              <p>Name: {contact.travelAgentName}</p>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card-package-content">
        <h3 className="card-title-package">Itinerary</h3>
        <div className="card-package-content">
          {itinerary.map((item) => (
            <div key={item.itineraryId}>
              <p>Famous place: {item.destinationName}</p>
              <p>{item.dayandVisit}</p>
              <p>Description: {item.destinationDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
