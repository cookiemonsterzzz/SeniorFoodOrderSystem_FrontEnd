import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Enquiry() {
  // Define state for form fields
  //const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic (e.g., send the message to a server)

    // Clear form input fields
    setEmail("");
    setSubject("");
    setDescription("");

    // Call the handleEnquiry function
    handleEnquiry();
  };

  const { loading, error } = useSelector((state) => state.order);

  const handleEnquiry = (e) => {
    if (!email | !description | !subject) {
      alert("Please fill in the blanks.");
      return;
    }
    showEnquirySuccess();
  };

  const showEnquirySuccess = () => {
    alert("Enquiry Submitted. You will hear from us soon (:");
    navigate("/menu");
  };

  function debounce(func, wait) {
    let timeout;

    return function(...args) {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }

  return (
    <div className="container text-center">
      <Navbar title={"Contact Us"}></Navbar>
      <div className="container-fluid text-center menu">
        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          <h1>Need Support?</h1>
          <div className="alert alert-secondary" role="alert">
            Please enquire if you are facing any technical difficulty. Our
            technical support will reach out to you within 3 working days.
          </div>
          <div class="mb-3">
            <label>Email:</label>
            <input
              type="email"
              class="form-control"
              placeholder="youremail@hotmail.com"
              aria-label="enquiry email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxlength="40"
            />
          </div>
          <div class="mb-3">
            <label>Subject:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your subject."
              aria-label="enquiry subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              maxlength="100"
            />
          </div>
          <div class="mb-3">
            <label>Description:</label>
            <textarea
              class="form-control"
              placeholder="Enter your enquiry here."
              aria-label="enquiry description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxlength="100"
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-danger w-100 mt-4 btn-make-payment"
            onClick={(e) => handleEnquiry(e)}
          >
            {"Submit Enquiry"}
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default Enquiry;
