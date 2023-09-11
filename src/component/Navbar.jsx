import React from "react";

const Navbar = ({ title }) => {
  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        <div className="navbar-brand">{title}</div>
        <button className="btn btn-sm btn-outline-light" type="submit">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
