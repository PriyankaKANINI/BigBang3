import React, { useState } from "react";
import "../feedback/feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(4);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [researchGroupChecked, setResearchGroupChecked] = useState(false);

  const handleRatingChange = (selectedRating) => {
    switch (selectedRating) {
      case "terrible":
        setRating(1);
        break;
      case "bad":
        setRating(2);
        break;
      case "okay":
        setRating(3);
        break;
      case "good":
        setRating(4);
        break;
      case "amazing":
        setRating(5);
        break;
      default:
        setRating(4);
    }
  };
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };
  const handlePrivacyCheckbox = () => {
    setPrivacyChecked(!privacyChecked);
  };

  const handleResearchGroupCheckbox = () => {
    setResearchGroupChecked(!researchGroupChecked);
  };

  const handleSubmit = () => {
    // Add your submit logic here
  };

  const handleCancel = () => {
    // Add your cancel logic here
  };

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
                <i class="bi bi-emoji-angry"></i>
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
                <i class="bi bi-emoji-smile"></i>{" "}
              </li>
              <li
                onClick={() => handleRatingChange("amazing")}
                className={rating === 5 ? "selected" : ""}
              >
                <i class="bi bi-emoji-laughing"></i>{" "}
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
          <div className="user-options">
            <label className="privacy-policy" onClick={handlePrivacyCheckbox}>
              <input
                type="checkbox"
                className="checkbox"
                checked={privacyChecked}
                onChange={handlePrivacyCheckbox}
              />
              <div className="policy-agreement">
                I may be contacted about this feedback.{" "}
                <a href="#">Privacy Policy</a>
              </div>
            </label>
            <label
              className="research-group"
              onClick={handleResearchGroupCheckbox}
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={researchGroupChecked}
                onChange={handleResearchGroupCheckbox}
              />
              <div className="research-improvements">
                I’d like to help improve by joining the{" "}
                <a href="#">Research Group</a>
              </div>
            </label>
          </div>
          <div className="cta">
            <div className="cancel-feedback" onClick={handleCancel}>
              Cancel
            </div>
            <div className="submit-feedback" onClick={handleSubmit}>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
