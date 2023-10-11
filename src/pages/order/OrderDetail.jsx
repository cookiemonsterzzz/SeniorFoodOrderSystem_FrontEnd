import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import { useDispatch } from "react-redux";
import { getOrderByID } from "../../redux/order/OrderSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RatingComponent from "../../component/Rating";
import { upsertRating } from "../../redux/rating/RatingSlice";

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState([]);
  const [disableRating, setDisableRating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.order);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleCheckboxChange = (value) => {
    if (review.includes(value)) {
      setReview((prevReview) => prevReview.filter((item) => item !== value));
    } else {
      setReview((prevReview) => [...prevReview, value]);
    }
  };

  const handleSubmitRating = () => {
    if (!window.confirm("Confirm to submit?")) {
      return;
    }

    const ratingDto = {
      orderId: orderDetail.id,
      stallId: orderDetail.stallId,
      rating: selectedRating,
      review: review.join(", "),
    };

    dispatch(upsertRating(ratingDto))
      .unwrap()
      .then((result) => {
        if (result) {
          window.alert("Rating submitted!");
          navigate("/menu");
        }
      })
      .catch((error) => {
        console.error("Error while submitting rating:", error);
        window.alert("Something happended.Please retry.");
        throw error;
      });
  };

  React.useEffect(() => {
    var orderId = new URLSearchParams(window.location.search).get("orderId");
    dispatch(getOrderByID(orderId))
      .then((result) => {
        if (result.payload) {
          setOrderDetail(result.payload);
          if (result.payload.rating) {
            setSelectedRating(result.payload.rating.rating);
            setReview(result.payload.rating.review.split(", "));
            setDisableRating(true);
          }
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
      <Navbar title={"Order Detail"}></Navbar>
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
                        aria-expanded="true"
                        aria-controls="panel"
                      >
                        {"Order ID: " + orderDetail.orderName}
                      </button>
                    </h4>
                    <div id="panel" className="accordion-collapse show">
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
                        <span className="text-start">
                          Amount : {orderDetail.amount.toFixed(2)}
                        </span>
                        <span className="text-start">
                          Status: {orderDetail.orderStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {orderDetail.orderStatus === "Done" && (
                  <>
                    <div className="d-flex justify-content-between">
                      <h1>Rating</h1>
                      <RatingComponent
                        selectedRating={selectedRating}
                        onRatingChange={handleRatingChange}
                      ></RatingComponent>
                    </div>
                    {disableRating ? (
                      <>
                        {review.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="Tasty food"
                            id="checkBox1"
                            checked={review.includes("Tasty food")}
                            onChange={() => handleCheckboxChange("Tasty food")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkBox1"
                          >
                            Tasty food
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="Good service"
                            id="checkBox2"
                            checked={review.includes("Good service")}
                            onChange={() =>
                              handleCheckboxChange("Good service")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkBox2"
                          >
                            Good service
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="Friendly staff"
                            id="checkBox3"
                            checked={review.includes("Friendly staff")}
                            onChange={() =>
                              handleCheckboxChange("Friendly staff")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkBox3"
                          >
                            Friendly staff
                          </label>
                        </div>
                        {selectedRating ? (
                          <button
                            type="button"
                            className="btn btn-danger w-100 mt-1 btn-red"
                            onClick={() => handleSubmitRating()}
                          >
                            {"Submit Rating"}
                          </button>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}
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

export default OrderDetail;
