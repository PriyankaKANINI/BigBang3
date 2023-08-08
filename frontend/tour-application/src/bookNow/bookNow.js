import "../bookNow/bookNow.css";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BookNow = () => {
  const [amount, setAmount] = useState(20);
  const [addTravelerCount, setAddTravelerCount] = useState(2);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingName, setBookingName] = useState("");
  const [bookingMail, setBookingMail] = useState("");

  const travelAgentId = 7;
  const travellerId = parseInt(localStorage.getItem("travellerId")) || 0;

  useEffect(() => {
    calculateAndSetTotalAmount();
  }, [amount, addTravelerCount]);

  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleAddTravelerCountChange = (event) => {
    setAddTravelerCount(parseInt(event.target.value) || 0);
  };

  const calculateTotalAmount = () => {
    if (addTravelerCount > 0) {
      return amount * addTravelerCount;
    }
    return amount;
  };

  const calculateAndSetTotalAmount = () => {
    const calculatedTotalAmount = calculateTotalAmount();
    setTotalAmount(calculatedTotalAmount);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const userProvidedBookingName = bookingName;
    const userProvidedBookingMail = bookingMail;

    doc.text("Booking Details", 10, 10);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Booking ID",
          "Package ID",
          "Travel Agent ID",
          "Traveller ID",
          "Booking Name",
          "Booking Mail",
          "Total Amount",
        ],
      ],
      body: [
        [
          1,
          4,
          travelAgentId,
          travellerId,
          userProvidedBookingName,
          userProvidedBookingMail,
          totalAmount.toFixed(2),
        ],
      ],
    });

    doc.save("booking-details.pdf");
  };

  return (
    <div className="booking-container">
      <div className="booking-form-container">
        <h2 className="booking-heading">Booking Details</h2>
        <form className="booking-form">
          <div className="input-group">
            <label className="input-label">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              step="0.01"
              className="input-field"
              required
            />
          </div>
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
              Total Amount: {totalAmount.toFixed(2)}
            </label>
          </div>
        </form>
        <div className="download-btn-container">
          <button className="download-btn" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
