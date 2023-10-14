import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (!window.confirm("Confirm to log out?")) {
      return;
    }

    window.dispatchEvent(new Event("logOut"));
  };

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
        <button
          className="btn btn-sm btn-outline-light"
          type="submit"
          onClick={() => handleLogOut()}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
