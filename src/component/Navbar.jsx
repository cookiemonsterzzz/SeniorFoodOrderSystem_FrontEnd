import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        <div
          className="navbar-brand"
          onClick={() => {
            navigate("/");
          }}
        >
          {title}
        </div>
        <button className="btn btn-sm btn-outline-light" type="submit">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
