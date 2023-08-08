import React, { useState, useEffect, useRef } from "react";
import "../booking/bookingMain.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import BookNow from "../bookNow/bookNow";
import TravelerHome from "./travelerHome";

const BookingMain = () => {
  const [bookings, setBookings] = useState([]);

  const [selectedItem, setSelectedItem] = useState({ type: "", id: null });
  const bookingMainContainerRef = useRef(null);

  const handleItemClick = (type, id) => {
    setSelectedItem((prevSelectedItem) => {
      if (prevSelectedItem.type === type && prevSelectedItem.id === id) {
        return { type: "", id: null };
      }

      return { type, id };
    });
  };
  const fetchContactDetails = async (packageId) => {
    try {
      const response = await fetch(
        "http://localhost:5202/api/ContactDetails/getAllContact"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contact details:", error);
      return [];
    }
  };
  const fetchItinerary = async (packageId) => {
    try {
      const response = await fetch(
        "http://localhost:5202/api/Itinerary/getAllItinerary"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching itinerary data:", error);
      return [];
    }
  };

  const fetchImages = async (packageId) => {
    try {
      const response = await fetch(
        "http://localhost:5234/api/TourImage/GettingImages"
      );
      if (!response.ok) {
        throw new Error("Network response for images was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching image data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5202/api/Package/getAllPackages"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookings(data);

        const bookingsWithData = await Promise.all(
          data.map(async (booking) => {
            const itineraryData = await fetchItinerary(booking.packageId);
            const contactDetails = await fetchContactDetails(booking.packageId);
            const imageData = await fetchImages(booking.packageId);
            return {
              ...booking,
              itinerary: itineraryData,
              contactDetails: contactDetails,
              images: imageData,
            };
          })
        );

        setBookings(bookingsWithData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        selectedItem.type !== "" &&
        !bookingMainContainerRef.current.contains(e.target)
      ) {
        setSelectedItem({ type: "", id: null });
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [selectedItem]);

  return (
    <div className="bookingMain-container" ref={bookingMainContainerRef}>
      <TravelerHome />
      <div className="bookingMain-item">
        {bookings !== null &&
          bookings.map((booking) => (
            <div className="bookingMain-card" key={booking.packageId}>
              <div className="bookingMain-card-content">
                <div className="bookingMain-card-row">
                  <h2>{booking.packageName}</h2>
                  <div className="booking-main-date-ad">
                    <h6 id="booking-main-date-ad">From: {booking.startDate}</h6>
                    <h6 id="booking-main-destination">
                      Departure - {booking.departurePoint}
                    </h6>
                  </div>
                  <div className="booking-main-date-ad">
                    <h6 id="booking-main-date-ad">To: {booking.endDate}</h6>
                    <h6 id="booking-main-destination">
                      Arrival - {booking.arrivalPoint}
                    </h6>
                  </div>
                  <h3 id="booking-main">Price - {booking.rate}/-</h3>
                </div>
                <div className="bookingMain-card-row">
                  <h5>Agency Name - {booking.travelAgencyName}</h5>
                  <h3 id="booking-main">No of days - {booking.totalDays}</h3>
                </div>
                <div className="bookingMain-card-row">
                  <p id="booking-main">{booking.description}</p>
                  <h3 id="booking-main">
                    Availability - {booking.availablityCount}
                  </h3>
                </div>
              </div>

              <div className="bookingMain-card-row">
                <div className="bookingMain-card-column">
                  <div
                    className="bookingMain-card-items"
                    onClick={() => handleItemClick("image", booking.packageId)}
                  >
                    Images
                  </div>
                  {selectedItem.type === "image" &&
                    selectedItem.id === booking.packageId && (
                      <div className="booking-card-images">
                        {booking.images && booking.images.length > 0 ? (
                          <Carousel
                            showThumbs={false}
                            showArrows={true}
                            showIndicators={true}
                            infiniteLoop={true}
                          >
                            {booking.images.map((image) => (
                              <div key={image.id}>
                                <img src={image.imagePath} alt={image.name} />
                              </div>
                            ))}
                          </Carousel>
                        ) : (
                          <p>No images available</p>
                        )}
                      </div>
                    )}
                </div>

                <div className="bookingMain-card-column">
                  <div
                    className="bookingMain-card-items"
                    onClick={() =>
                      handleItemClick("itinerary", booking.packageId)
                    }
                  >
                    Itinerary
                  </div>
                  {selectedItem.type === "itinerary" &&
                    selectedItem.id === booking.packageId && (
                      <div className="card">
                        <p>Itinerary details:</p>
                        {booking.itinerary !== null ? (
                          booking.itinerary.map((item) => (
                            <p key={item.itineraryId}>
                              Famous place: {item.destinationName}
                              <br />
                              {item.dayandVisit}
                              <br />
                              Description: {item.destinationDescription}
                            </p>
                          ))
                        ) : (
                          <p>No itinerary details available</p>
                        )}
                      </div>
                    )}
                </div>
                <div className="bookingMain-card-column">
                  <div
                    className="bookingMain-card-items"
                    onClick={() =>
                      handleItemClick("contact", booking.packageId)
                    }
                  >
                    Contact
                  </div>
                  {selectedItem.type === "contact" &&
                    selectedItem.id === booking.packageId && (
                      <div className="bookingMain-card-items">
                        <p>Contact Details:</p>
                        {booking.contactDetails.length > 0 ? (
                          booking.contactDetails.map((contact) => (
                            <div key={contact.contactId}>
                              <p>Name: {contact.travelAgentName}</p>
                              <p>Email: {contact.email}</p>
                              <p>Phone: {contact.phone}</p>
                            </div>
                          ))
                        ) : (
                          <p>No contact details available</p>
                        )}
                      </div>
                    )}
                </div>

                <div className="bookingMain-card-button">
                  <button className="bookingMain-card-button">
                    <Link to="/bookNow" className="book-now-link">
                      Book Now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingMain;
