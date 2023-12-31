import "../booking/bookNow.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";
Modal.setAppElement("#root");

const BookNow = () => {
  const [addTravelerCount, setAddTravelerCount] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingMail, setBookingMail] = useState("");
  const [selectedPackageAmount, setSelectedPackageAmount] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nameError, setNameError] = useState("");
  const [mailError, setMailError] = useState("");
  const packageId = parseInt(localStorage.getItem("selectedPackageId")) || 0;
  const navigate = useNavigate();
  useEffect(() => {
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
    navigate("/");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const userProvidedBookingName = bookingName;
    const userProvidedBookingMail = bookingMail;

    const totalAmount = calculateTotalAmount();

    const apiUrl = "http://localhost:5085/api/ManageBooking";

    const bookingData = {
      packageId: packageId,
      addTravelerCount: addTravelerCount,
      bookingName: userProvidedBookingName,
      bookingMail: userProvidedBookingMail,
      amount: selectedPackageAmount,
      totalAmount: totalAmount,
    };
    if (!bookingName) {
      setNameError("Name is required");
      return;
    }
    if (!bookingMail) {
      setMailError("Email is required");
      return;
    }
    if (!addTravelerCount) {
      setMailError("Count is required");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking data saved:", data);

        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Tours Co.", 10, 15);
        doc.setFontSize(12);
        doc.text("1234 Travel Street, Cityville", 10, 25);
        doc.text("+1 (123) 456-7890", 10, 35);
        doc.text("info@toursco.com", 10, 45);

        doc.rect(5, 50, doc.internal.pageSize.getWidth() - 10, 200);

        doc.setFontSize(14);
        doc.text("Booking Details", 10, 65);
        doc.setFontSize(12);
        doc.text(`Package ID: ${bookingData.packageId}`, 10, 80);
        doc.text(`Booking Name: ${userProvidedBookingName}`, 10, 95);
        doc.text(`Booking Email: ${userProvidedBookingMail}`, 10, 110);
        doc.text(`Amount: ${selectedPackageAmount.toFixed(2)}`, 10, 125);
        doc.text(`Total Amount: ${totalAmount.toFixed(2)}`, 10, 140);
        doc.text("Happy Travelling!", 10, 160);

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
            <label className="input-label"></label>
            <input
              type="number"
              value={addTravelerCount}
              onChange={handleAddTravelerCountChange}
              min="0"
              className="input-field"
              required
              placeholder="Additional Traveler Count"
            />
          </div>
          <div className="input-group">
            <label className="input-label"> </label>
            <input
              type="text"
              value={bookingName}
              onChange={(event) => {
                setBookingName(event.target.value);
                setNameError("");
              }}
              className="input-field"
              required
              placeholder="Name"
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <div className="input-group">
            <label className="input-label"> </label>
            <input
              type="email"
              value={bookingMail}
              onChange={(event) => {
                setBookingMail(event.target.value);
                setMailError("");
              }}
              className="input-field"
              required
              placeholder="Mail"
            />
            {mailError && <p className="error-message">{mailError}</p>}
          </div>
          <div className="input-group">
            <label className="input-label total-amount-label">
              Total Amount: ₹{" "}
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
