import React, { useState } from "react";
import LogoImage from "../../logo.png";
import { useDispatch } from "react-redux";
import { loginWithPhoneNo } from "../../redux/auth/UserSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [phoneNo, setPhoneNo] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (event) => {
    const value = event.target.value;
    setPhoneNo(value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginWithPhoneNo(phoneNo)).then((result) => {
      if (result.payload) {
        setPhoneNo("");
        navigate("/");
      }
    });
  };

  return (
    <div className="container text-center">
      <div className="text-center">
        <img
          src={LogoImage}
          alt="Senior Food Order System Logo"
          width={300}
          height={300}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg">
          <p className="input-group-text mt-0 mb-0">+65</p>
          <input
            maxLength={8}
            type="text"
            name="PhoneNo."
            placeholder="Phone No."
            className="form-control"
            value={phoneNo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger btn-lg mt-2 w-100">
          {loading ? "Loading..." : "Proceed"}
        </button>
      </form>
      {error && (
        <div>
          <div className="alert alert-danger mt-1">{error}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
