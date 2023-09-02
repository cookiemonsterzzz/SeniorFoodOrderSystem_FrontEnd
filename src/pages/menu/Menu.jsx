import React from "react";

export const Menu = () => {
  return (
    <div className="container">
      <nav className="navbar fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Menu
          </a>
          <button className="btn btn-sm btn-outline-light" type="submit">
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};
