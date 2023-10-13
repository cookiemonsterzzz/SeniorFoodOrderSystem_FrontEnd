import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEnquiry } from "../../redux/enquiry/EnquirySlice";

function Enquiry() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description | !subject) {
      alert("Please fill in the blanks.");
      return;
    }

    var dto = { EnquiriesSubject: subject, EnquiriesDescription: description };

    dispatch(addEnquiry(dto))
      .then((result) => {
        console.log(result);
        if (result.payload) {
          showEnquirySuccess();
        }
      })
      .catch((error) => {
        window.alert("Something happended.Please retry.");
        throw error;
      });
  };

  const showEnquirySuccess = () => {
    window.alert("Enquiry Submitted. You will hear from us soon.");
    setSubject("");
    setDescription("");
    navigate("/menu");
  };

  const handleCallPhoneNo = () => {
    window.open("tel:96127655");
  };

  return (
    <div className="container text-center">
      <Navbar title={"Enquiry"}></Navbar>
      <div className="container-fluid text-center menu">
        <h1>Need Support?</h1>
        <p>If your enquiry is urgent, please call us at:</p>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => handleCallPhoneNo()}
        >
          +65 9612 7655
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label>Subject:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your subject"
              aria-label="enquiry subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              maxLength="100"
            />
          </div>
          <div className="mb-1">
            <label>Description:</label>
            <textarea
              className="form-control"
              placeholder="Enter your enquiry"
              aria-label="enquiry description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength="100"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-danger mt-1 w-100 btn-red">
            {"Submit Enquiry"}
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default Enquiry;
