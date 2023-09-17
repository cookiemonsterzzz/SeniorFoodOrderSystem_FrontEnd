import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import { useDispatch } from "react-redux";
import { getOrderById } from "../../redux/order/OrderSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Payment = ({ orderId }) => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [onlinePaymentMode, setOnlinePaymentMode] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.order);

  const handlePaymentMode = (value) => {
    setPaymentMode(value);
  };

  const handlePay = (event) => {
    if (!onlinePaymentMode) {
      alert("Please select one online payment mode.");
      return;
    }
    showPaymentSuccess();
  };

  const showPaymentSuccess = () => {
    alert("Payment Success");
    navigate("/menu");
  };

  React.useEffect(() => {
    var newOrderId = orderId || location;
    dispatch(getOrderById(newOrderId)).then((result) => {
      if (result.payload) {
        setOrderDetail(result.payload);
      }
    });

    window.addEventListener("paymentMade", showPaymentSuccess);

    return () => {
      window.removeEventListener("paymentMade", showPaymentSuccess);
    };
  }, []);

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
      <Navbar title={"Payment"}></Navbar>
      {error ? (
        <div>
          <div className="alert alert-danger mt-1">{error}</div>
        </div>
      ) : loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="container-fluid text-center menu">
          {orderDetail && (
            <>
              <h1>{"Order ID: " + orderDetail.OrderId}</h1>
              <h1>Total Payable</h1>
              <h2 className="payable-amount">{"$" + orderDetail.Total}</h2>
              <div className="btn-group" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  id="btnCash"
                  name="btnRadio"
                  value={"Cash"}
                  defaultChecked
                  onChange={(e) => handlePaymentMode(e.target.value)}
                />
                <label
                  className="btn btn-outline-danger btn-payment"
                  htmlFor="btnCash"
                >
                  Cash
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  id="btnOnline"
                  name="btnRadio"
                  value={"Online"}
                  onChange={(e) => handlePaymentMode(e.target.value)}
                />
                <label
                  className="btn btn-outline-danger btn-payment"
                  htmlFor="btnOnline"
                >
                  Online
                </label>
              </div>
              <div className="mt-4">
                {paymentMode === "Cash" ? (
                  <div className="alert alert-secondary" role="alert">
                    Please bring your phone and show this screen to the staff at
                    counter to make payment.
                  </div>
                ) : (
                  <>
                    <div className="form-check text-end">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={"btnRadioPaynow"}
                        id={"btnRadioPaynow"}
                        value={"Paynow"}
                        checked={onlinePaymentMode === "Paynow"}
                        onChange={(e) => setOnlinePaymentMode(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="btnRadioPaynow"
                      >
                        Paynow
                      </label>
                    </div>
                    <div className="form-check text-end">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="BankCard"
                        checked={onlinePaymentMode === "BankCard"}
                        name={"btnRadioBankCard"}
                        id={"btnRadioBankCard"}
                        onChange={(e) => setOnlinePaymentMode(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={"btnRadioBankCard"}
                      >
                        Credit/Debit Card
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger w-100 mt-4 btn-make-payment"
                      onClick={(e) => handlePay(e)}
                    >
                      {"Pay"}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
