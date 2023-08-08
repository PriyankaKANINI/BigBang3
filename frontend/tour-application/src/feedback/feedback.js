import React, { useState } from "react";
import "../feedback/feedback.css";
import { Modal, Button } from "react-bootstrap";

const Feedback = () => {
  const [rating, setRating] = useState(4);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [researchGroupChecked, setResearchGroupChecked] = useState(false);

  const handleRatingChange = (selectedRating) => {
    let smileyValue = 0;
    switch (selectedRating) {
      case "terrible":
        setRating(1);
        smileyValue = 1;
        break;
      case "bad":
        setRating(2);
        smileyValue = 2;
        break;
      case "okay":
        setRating(3);
        smileyValue = 3;
        break;
      case "good":
        setRating(4);
        smileyValue = 4;
        break;
      case "amazing":
        setRating(5);
        smileyValue = 5;
        break;
      default:
        setRating(4);
        smileyValue = 4;
    }

    localStorage.setItem("feedbackSmiley", smileyValue);
  };

  const [feedbackText, setFeedbackText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };
  const handlePrivacyCheckbox = () => {
    setPrivacyChecked(!privacyChecked);
  };

  const handleResearchGroupCheckbox = () => {
    setResearchGroupChecked(!researchGroupChecked);
  };

  const handleSubmit = async () => {
    if (feedbackText.trim() !== "") {
      const storedSmiley = localStorage.getItem("feedbackSmiley");
      const storedUserId = localStorage.getItem("userId"); // Assuming user ID is stored as "userId"

      if (storedSmiley !== null && storedUserId !== null) {
        const feedbackData = {
          userId: parseInt(storedUserId),
          smiley: parseInt(storedSmiley),
          feedbackText: feedbackText,
        };

        try {
          const response = await fetch(
            "http://localhost:5045/api/FeedBack/CreateFeedback",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(feedbackData),
            }
          );

          if (response.status === 201) {
            showThanksModal();

            localStorage.removeItem("feedbackSmiley");
            setRating(4);
            setFeedbackText("");
            setPrivacyChecked(false);
            setResearchGroupChecked(false);
          } else {
            alert("Failed to store feedback in the database");
            localStorage.removeItem("feedbackSmiley");
          }
        } catch (error) {
          alert("Error submitting feedback: " + error.message);
          localStorage.removeItem("feedbackSmiley");
        }
      } else {
        alert("Please provide both a smiley rating and feedback text");
      }
    } else {
      alert("Please provide feedback text");
    }
  };

  const handleSubmit1 = () => {
    showThanksModal();
  };
  const showThanksModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {};

  return (
    <div className="feedback-page">
      <div className="background-image"></div>
      <div className="wrapper-feedback">
        <div className="card-feedback">
          <div className="title-feedback">
            Kindly give us your valuable feedback
          </div>
          <div className="rating-feedback">
            <ul>
              <li
                onClick={() => handleRatingChange("terrible")}
                className={rating === 1 ? "selected" : ""}
              >
                <i className="bi bi-emoji-angry"></i>
              </li>
              <li
                onClick={() => handleRatingChange("bad")}
                className={rating === 2 ? "selected" : ""}
              >
                <i class="bi bi-emoji-frown"></i>
              </li>
              <li
                onClick={() => handleRatingChange("okay")}
                className={rating === 3 ? "selected" : ""}
              >
                <i class="bi bi-emoji-neutral"></i>
              </li>
              <li
                onClick={() => handleRatingChange("good")}
                className={rating === 4 ? "selected" : ""}
              >
                <i className="bi bi-emoji-smile"></i>{" "}
              </li>
              <li
                onClick={() => handleRatingChange("amazing")}
                className={rating === 5 ? "selected" : ""}
              >
                <i className="bi bi-emoji-laughing"></i>{" "}
              </li>
            </ul>
          </div>
          <div className="feedback-box">
            <div className="feedback-title">
              What are the main reasons for your rating?
            </div>
            <div className="box-feedback-main">
              <textarea
                className="box-feedback"
                value={feedbackText}
                onChange={handleFeedbackTextChange}
                rows={5}
              />
            </div>
          </div>
          <div className="cta">
            <div className="cancel-feedback" onClick={handleCancel}>
              Cancel
            </div>
            <div className="submit-feedback" onClick={handleSubmit1}>
              Submit
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you for your feedback!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your feedback has been successfully submitted.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Feedback;
