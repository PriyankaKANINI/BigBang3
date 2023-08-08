import "../booking/bookNow.css";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";
Modal.setAppElement("#root");

const BookNow = () => {
  const [addTravelerCount, setAddTravelerCount] = useState(2);
  const [bookingName, setBookingName] = useState("");
  const [bookingMail, setBookingMail] = useState("");
  const [selectedPackageAmount, setSelectedPackageAmount] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const packageId = parseInt(localStorage.getItem("selectedPackageId")) || 0;

  useEffect(() => {
    // Fetch package details using the packageId
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5202/api/Package/getPackageById?id=${packageId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched package details:", data);
        setPackageDetails(data);
        setSelectedPackageAmount(parseFloat(data.rate));
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  const calculateTotalAmount = () => {
    const baseAmount = selectedPackageAmount || 0;
    const totalAmount = baseAmount + addTravelerCount * 20;
    return totalAmount;
  };

  const handleAddTravelerCountChange = (event) => {
    setAddTravelerCount(parseInt(event.target.value) || 0);
  };
  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const userProvidedBookingName = bookingName;
    const userProvidedBookingMail = bookingMail;

    const totalAmount = calculateTotalAmount();

    const apiUrl = "http://localhost:5085/api/ManageBooking";

    // Prepare booking data for API request
    const bookingData = {
      packageId: packageId,
      addTravelerCount: addTravelerCount,
      bookingName: userProvidedBookingName,
      bookingMail: userProvidedBookingMail,
      amount: selectedPackageAmount,
      totalAmount: totalAmount,
    };

    // Configure API request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    };

    // Send POST request to API
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking data saved:", data);

        // Generate PDF and perform other actions as needed
        const doc = new jsPDF();

        doc.text("Booking Details", 10, 10);
        doc.setFontSize(12);
        doc.text(`Package ID: ${bookingData.packageId}`, 10, 30);
        doc.text(`Booking Name: ${userProvidedBookingName}`, 10, 40);
        doc.text(`Booking Email: ${userProvidedBookingMail}`, 10, 50);
        doc.text(`Amount: ${selectedPackageAmount.toFixed(2)}`, 10, 60);
        doc.text(`Total Amount: ${totalAmount.toFixed(2)}`, 10, 70);
        doc.text("Happy Travelling!", 10, 90);
        doc.save("booking-details.pdf");
      })
      .catch((error) => {
        console.error("Error saving booking data:", error);
      });
    handleModalOpen();
  };

  if (!packageDetails) {
    return <p>Loading package details...</p>;
  }

  return (
    <div className="booking-container">
      <div className="booking-form-container">
        <h2 className="booking-heading">Booking Details</h2>
        <form className="booking-form">
          <div className="input-group">
            <label className="input-label">Additional Traveler Count:</label>
            <input
              type="number"
              value={addTravelerCount}
              onChange={handleAddTravelerCountChange}
              min="0"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="input-label"> Name:</label>
            <input
              type="text"
              value={bookingName}
              onChange={(event) => setBookingName(event.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label"> Mail:</label>
            <input
              type="email"
              value={bookingMail}
              onChange={(event) => setBookingMail(event.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label total-amount-label">
              Total Amount:{" "}
              {selectedPackageAmount
                ? (selectedPackageAmount + addTravelerCount * 20).toFixed(2)
                : 0}
            </label>
          </div>
        </form>
        <div className="download-btn-container">
          <button className="download-btn" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </div>
      </div>
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Success Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Success</h2>
        <p>Thanks for booking, Happy Travelling</p>
        <button onClick={handleModalClose}>Close</button>
      </Modal>
    </div>
  );
};

export default BookNow;
