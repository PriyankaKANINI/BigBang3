import React, { useState, useEffect, useRef } from "react";
import "../booking/bookingMain.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import BookNow from "./bookNow";
import TravelerHome from "./travelerHome";
import PackageDetails from "./packageDetails";

const BookingMain = () => {
  const [bookings, setBookings] = useState([]);

  const [selectedItem, setSelectedItem] = useState({ type: "", id: null });
  const selectedPackageId =
    parseInt(localStorage.getItem("selectedPackageId")) || 0;

  const bookingMainContainerRef = useRef(null);
  const userID = parseInt(localStorage.getItem("userId")) || 0;

  const handleItemClick = (type, id) => {
    setSelectedItem((prevSelectedItem) => {
      if (prevSelectedItem.type === type && prevSelectedItem.id === id) {
        return { type: "", id: null };
      }

      return { type, id };
    });
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5234/api/TourImage/GettingImages"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Assuming data is an array of image objects with imagePath property
        const imageUrls = data.map((image) => image.imagePath);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="bookingMain-container" ref={bookingMainContainerRef}>
      <TravelerHome />
      <div>
        <Carousel showArrows={true} showThumbs={false}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Tour ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
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
                  <h3 id="booking-main">Price - ₹{booking.rate}/-</h3>
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

                <div className="bookingMain-card-button">
                  <button className="bookingMain-card-button">
                    <Link
                      to={`/bookNow/${booking.packageId}`}
                      onClick={() => {
                        localStorage.setItem(
                          "selectedPackageId",
                          booking.packageId
                        );
                        localStorage.setItem("userId", userID);
                      }}
                      className="book-now-link"
                    >
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
