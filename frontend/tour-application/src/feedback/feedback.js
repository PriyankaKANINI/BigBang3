import React, { useState } from "react";
import "../feedback/feedback.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement the logic here to submit the feedback to your backend or store it in a database.
    // For this example, we'll just set the submitted flag to true.
    setSubmitted(true);
  };

  return (
    <div>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Feedback Form</h2>
          <div>
            <label htmlFor="feedback">Your Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
