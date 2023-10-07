import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrders } from "../../redux/order/OrdersSlice";

const Order = () => {
  const [orders, setOrders] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.orders);

  React.useEffect(() => {
    dispatch(getOrders())
      .then((result) => {
        if (result.payload) {
          setOrders(result.payload);
        }
      })
      .catch((error) => {
        console.error("Error during dispatch:", error);
        window.alert("Something happended.Please retry.");
        throw error;
      });
  }, []);

  return (
    <div className="container text-center">
      <Navbar title={"Order History"}></Navbar>
      <div className="container-fluid text-center menu">
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : loading ? (
          <div className="w-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {orders && (
              <ol className="list-group list-group-numbered w-100">
                {orders.map((x) => (
                  <li
                    key={x.id}
                    onClick={() => {}}
                    className="list-group-item d-flex justify-content-between align-items-start align-items-center"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">ID: {x.orderName}</div>
                    </div>
                    <span
                      className={
                        "badge " +
                        (x.orderStatus === "Unpaid"
                          ? "bg-danger"
                          : x.orderStatus === "In Progress"
                          ? "bg-warning"
                          : x.orderStatus === "Done"
                          ? "bg-success"
                          : "bg-primary") +
                        " bg-xs rounded-pill"
                      }
                    >
                      {x.orderStatus}
                    </span>
                  </li>
                ))}
              </ol>
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

export default Order;
