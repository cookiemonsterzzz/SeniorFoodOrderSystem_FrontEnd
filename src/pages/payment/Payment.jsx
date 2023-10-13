import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import { useDispatch } from "react-redux";
import { getOrderByID } from "../../redux/order/OrderSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { upsertPayment } from "../../redux/payment/PaymentSlice";

const Payment = ({ orderId }) => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [onlinePaymentMode, setOnlinePaymentMode] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.order);

  const handlePaymentMode = (value) => {
    setPaymentMode(value);
  };

  const handlePay = () => {
    if (!window.confirm("Confirm to pay?")) {
      return;
    }

    if (!onlinePaymentMode) {
      alert("Please select one online payment mode.");
      return;
    }

    var dto = { orderId: orderDetail.id, paymentMode: onlinePaymentMode };

    dispatch(upsertPayment(dto))
      .then((result) => {
        if (result.payload) {
          showPaymentSuccess();
        }
      })
      .catch((error) => {
        window.alert("Something happended.Please retry.");
        throw error;
      });
  };

  const showPaymentSuccess = () => {
    alert("Payment Success");
    navigate("/menu");
  };

  React.useEffect(() => {
    var paymentOrderId =
      orderId || new URLSearchParams(window.location.search).get("orderId");
    dispatch(getOrderByID(paymentOrderId))
      .then((result) => {
        if (result.payload) {
          if (result.payload.orderStatus !== "Unpaid") {
            alert("Payment already made.");
            navigate("/menu");
            return;
          }
          setOrderDetail(result.payload);
        }
      })
      .catch((error) => {
        console.error("Error during dispatch:", error);
        window.alert("Something happended.Please retry.");
        throw error;
      });

    //window.dispatchEvent(new Event('paymentMade_Order_20231001155027'));
    window.addEventListener(
      "paymentMade_" + paymentOrderId,
      showPaymentSuccess
    );

    return () => {
      window.removeEventListener(
        "paymentMade_" + paymentOrderId,
        showPaymentSuccess
      );
    };
  }, []);

  return (
    <div className="container text-center">
      <Navbar title={"Payment"}></Navbar>
      <div className="container-fluid text-center menu">
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            {orderDetail && (
              <>
                <div className="accordion mb-1" id="accordionPanelsStayOpen">
                  <div className="accordion-item">
                    <h4 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panel"
                        aria-expanded="false"
                        aria-controls="panel"
                      >
                        {"Order ID: " + orderDetail.orderName}
                      </button>
                    </h4>
                    <div id="panel" className="accordion-collapse collapse">
                      <div className="accordion-body d-flex flex-column justify-content-start">
                        <span>
                          <strong>{orderDetail.foodName}</strong>
                        </span>
                        <span className="text-start">
                          Quantity : {orderDetail.quantity}
                        </span>
                        <span className="text-start">
                          Price : {orderDetail.foodPrice}
                        </span>
                        <span className="text-start">
                          Add On : {orderDetail.foodCustomization}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h1>Total Payable</h1>
                <h2 className="payable-amount">
                  {"$" + orderDetail.amount.toFixed(2)}
                </h2>

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
                <div className="mt-2">
                  {paymentMode === "Cash" ? (
                    <div className="alert alert-secondary" role="alert">
                      Please bring your phone and show this screen to the staff
                      at counter to make payment.
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
                        className="btn btn-danger w-100 mt-4 btn-red"
                        onClick={(e) => handlePay(e)}
                      >
                        {"Pay"}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
        <button
          id="btnBackToMenu"
          type="button"
          className="btn btn-link"
          onClick={() => {
            navigate("/menu");
          }}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Payment;
