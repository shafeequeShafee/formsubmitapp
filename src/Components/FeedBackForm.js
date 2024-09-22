import React, { useState } from "react";

import { feedbackImages } from "../Common/feedbackImages";
import { feedbackFormValidation } from "../Service/FormValidation/feedbackFormValidation";
export default function FeedBackForm() {
  const [feedbacks, setFeedbacks] = useState([
    {
      name: "Shafeeque",
      contactNumber: "9446######",
      email: "sfq@gmail.com",
      satisfactionLevel: 70,
      feedback: "Have a nice day",
    },
  ]);
  const [activeEmoji, setActiveEmoji] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    contactNumber: "",
    email: "",
    satisfactionLevel: 0,
    feedback: "",
  });
  const [errors, setErrors] = useState({});
  const feedbackImageMap = {
    worst: {
      img: feedbackImages?.worst?.img,
      label: feedbackImages?.worst?.label,
    },
    notGood: {
      img: feedbackImages?.notGood?.img,
      label: feedbackImages?.notGood?.label,
    },
    fine: {
      img: feedbackImages?.fine?.img,
      label: feedbackImages?.fine?.label,
    },
    lookGood: {
      img: feedbackImages?.lookGood?.img,
      label: feedbackImages?.lookGood?.label,
    },
    veryGood: {
      img: feedbackImages?.veryGood?.img,
      label: feedbackImages?.veryGood?.label,
    },
  };
  const getExperienceEmoji = (satisfactionLevel) => {
    if (satisfactionLevel > 80) return feedbackImageMap.veryGood;
    if (satisfactionLevel > 60) return feedbackImageMap.lookGood;
    if (satisfactionLevel > 40) return feedbackImageMap.fine;
    if (satisfactionLevel > 20) return feedbackImageMap.notGood;
    return feedbackImageMap.worst;
  };
  const handleFeedBackSubmit = (e) => {
    e.preventDefault();
    const validationErrors = feedbackFormValidation(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFeedbacks([...feedbacks, formValues]);
    setFormValues({
      name: "",
      contactNumber: "",
      email: "",
      satisfactionLevel: 0,
      feedback: "",
    });
    setActiveEmoji("");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
    if (id === "satisfactionLevel") {
      let activeClass = "";
      if (value <= 0) activeClass = "";
      if (value > 0 && value <= 20) activeClass = "worst";
      if (value > 20 && value <= 40) activeClass = "notGood";
      if (value > 40 && value <= 60) activeClass = "fine";
      if (value > 60 && value <= 80) activeClass = "lookGood";
      if (value > 80 && value <= 100) activeClass = "veryGood";
      setActiveEmoji(activeClass);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: !value ? prevErrors[id] : "",
    }));
  };

  return (
    <div className="feed-back-form-parent">
      <div className="feed-back-form-container">
        <div className="form-container">
          <form className="content-container">
            <p>Please provide your feedback</p>
            <div className="form-input">
              <div className="input-container">
                <label for="name">Name</label>
                <input
                  id="name"
                  value={formValues?.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                {errors?.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div className="input-container">
                <label for="contactNumber">Contact Number</label>
                <input
                  id="contactNumber"
                  value={formValues?.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                />
                {errors?.contactNumber && (
                  <span className="error-message">{errors.contactNumber}</span>
                )}
              </div>
              <div className="input-container">
                <label for="email">Email Address</label>
                <input
                  onChange={handleChange}
                  placeholder="Email Address"
                  value={formValues?.email}
                  id="email"
                />
                {errors?.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>
            <h3>Share your experience in scaling</h3>
            <div className="feed-back-img-container">
              <div
                className={`img-container ${
                  activeEmoji === "worst" ? "active" : ""
                }`}
              >
                <img
                  src={feedbackImages?.worst?.img}
                  alt={feedbackImages?.worst?.label}
                />
                <span>Worst</span>
              </div>
              <div
                className={`img-container ${
                  activeEmoji === "notGood" ? "active" : ""
                }`}
              >
                <img
                  src={feedbackImages?.notGood?.img}
                  alt={feedbackImages?.notGood?.label}
                />
                <span>Not Good</span>
              </div>
              <div
                className={`img-container ${
                  activeEmoji === "fine" ? "active" : ""
                }`}
              >
                <img
                  src={feedbackImages?.fine?.img}
                  alt={feedbackImages?.fine?.label}
                />
                <span>Fine</span>
              </div>
              <div
                className={`img-container ${
                  activeEmoji === "lookGood" ? "active" : ""
                }`}
              >
                <img
                  src={feedbackImages?.lookGood?.img}
                  alt={feedbackImages?.lookGood?.label}
                />
                <span>Look Good</span>
              </div>
              <div
                className={`img-container ${
                  activeEmoji === "veryGood" ? "active" : ""
                }`}
              >
                <img
                  src={feedbackImages?.veryGood?.img}
                  alt={feedbackImages?.veryGood?.label}
                />
                <span>Very Good</span>
              </div>
            </div>
            <div className="form-input-bottom">
              <input
                onChange={handleChange}
                id="satisfactionLevel"
                value={formValues?.satisfactionLevel}
                className=""
                type="range"
              />
              {errors?.satisfactionLevel && (
                <span className="error-message">
                  {errors.satisfactionLevel}
                </span>
              )}
              <textarea
                id="feedback"
                onChange={handleChange}
                value={formValues?.feedback}
              ></textarea>
              {errors?.feedback && (
                <span className="error-message">{errors.feedback}</span>
              )}
              <button type="submit" onClick={handleFeedBackSubmit}>
                SUBMIT
              </button>
            </div>
          </form>
        </div>
        <div className="feed-back-container">
          <div className="content-container">
            <h2>Submitted Feedbacks</h2>
            {feedbacks?.length > 0 &&
              feedbacks.map((data, i) => {
                const { img, label } = getExperienceEmoji(
                  data.satisfactionLevel
                );
                return (
                  <>
                    <div className="submitted-feedback" key={i}>
                      <div className="content-from-user">
                        <p className="user-comments">{data.feedback}</p>
                        <p className="user-name">{data.name}</p>
                      </div>
                      <div className="img-container">
                        <img src={img} alt={label} />
                        <span>{label}</span>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
