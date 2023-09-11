import React from "react";
import Navbar from "../../component/Navbar";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();

  return (
    <div className="container text-center">
      <Navbar title={"Payment"}></Navbar>
      <div className="container-fluid text-center menu">
        <h1>Total Payable</h1>
        <h2 className="payable-amount">{"$" + state}</h2>
      </div>
    </div>
  );
};

export default Payment;
