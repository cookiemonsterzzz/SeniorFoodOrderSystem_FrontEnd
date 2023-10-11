import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getMenuWithPreferences } from "../../redux/menu/MenuSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { upsertOrder } from "../../redux/order/OrderUpsertSlice";

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedStallId, setSelectedStallId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addOn, setAddOn] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.menu);

  const handleModal = (food, stallId) => {
    setSelectedFood(food);
    setSelectedStallId(stallId);
    if (food) {
      setTotal(food.price);
      setQuantity(1);
    } else {
      setTotal(0);
      setQuantity(0);
    }
  };

  const handleQty = (qty) => {
    if (qty <= 9 && qty > 0) {
      setQuantity(qty);
    }
  };

  const handleCustomization = (checked, addOnItem, addOnAmount) => {
    addOnAmount = parseFloat(addOnAmount.toFixed(2));
    if (checked) {
      setAddOn([...addOn, { key: addOnItem, value: addOnAmount }]);
    } else {
      var tempArr = [...addOn];
      const index = tempArr.findIndex(
        (item) => item.key === addOnItem && item.value === addOnAmount
      );
      if (index !== -1) {
        tempArr.splice(index, 1);
        setAddOn(tempArr);
      }
    }
  };

  const handlePlusClick = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
    }
  };

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePayment = () => {
    //create order
    if (!window.confirm("Confirm to order?")) {
      return;
    }

    let orderDto = {
      FoodName: selectedFood.foodName,
      FoodCustomization: addOn
        .map((item) => `${item.key}: ${item.value}`)
        .join(", "),
      FoodPrice: selectedFood.price,
      Quantity: quantity,
      Amount: parseFloat(total),
      StallId: selectedStallId,
    };

    dispatch(upsertOrder(orderDto))
      .then((result) => {
        if (result.payload) {
          handleModal(null, null);
          document.getElementById("btnCloseModal").click();

          let orderId = result.payload.id;
          navigate("/payment?orderId=" + orderId);
        }
      })
      .catch((error) => {
        console.error("Error during dispatch:", error);
        window.alert("Something happended.Please retry.");
        throw error;
      });
  };

  const calculateTotal = () => {
    const basePrice = selectedFood.price;
    const addonPrice = addOn
      ? addOn.reduce((acc, addon) => {
          return acc + addon.value;
        }, 0)
      : 0;
    var newTotal = ((basePrice + addonPrice) * quantity).toFixed(2);
    setTotal(newTotal);
  };

  const goToOrderHistory = () => {
    navigate("/order");
  };

  const goToEnquiry = () => {
    navigate("/enquiry");
  };

  React.useEffect(() => {
    if (selectedFood) {
      calculateTotal();
    }
  }, [selectedFood, quantity, addOn]);

  React.useEffect(() => {
    dispatch(getMenuWithPreferences())
      .then((result) => {
        if (result.payload) {
          setMenu(result.payload);
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
      <Navbar title={"Menu"}></Navbar>
      {error ? (
        <div className="container-fluid text-center menu">
          <div className="alert alert-danger mt-1">{error}</div>
        </div>
      ) : loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="container-fluid text-center menu">
            {menu &&
              menu.map((stall) => (
                <div key={JSON.stringify(stall)} className="mt-1">
                  <div className="row row-cols-2">
                    <div className="col">
                      <h2>{stall.stallName}</h2>
                    </div>
                    <div className="col">{numberStars(stall.rating)}</div>
                  </div>
                  <div className="row row-cols-2">
                    {stall.foods.map((food) => (
                      <div
                        key={food.foodName}
                        className="salad-card"
                        data-bs-toggle="modal"
                        data-bs-target="#foodModal"
                        onClick={() => handleModal(food, stall.stallId)}
                      >
                        <img src={food.image} alt={food.foodName} />
                        <div className="salad-detail-card">
                          <h3>{food.foodName}</h3>
                          <p>${food.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          <button className="enquiry-button" onClick={() => goToEnquiry()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-headset"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
            </svg>
          </button>

          <nav className="fixed-bottom p-2">
            <button
              type="button"
              className="btn btn-danger w-100 btn-red"
              onClick={() => {
                goToOrderHistory();
              }}
            >
              {"Order History"}
            </button>
          </nav>

          <div id="foodModal" className="modal">
            <div className="modal-dialog modal-fullscreen">
              {selectedFood && (
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{selectedFood.foodName}</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        handleModal(null, null);
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <img
                      className="mb-2"
                      src={selectedFood.image}
                      alt={selectedFood.foodName}
                    />
                    <div className="input-group text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        type="button"
                        onClick={handleMinusClick}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        placeholder=""
                        value={quantity}
                        min="1"
                        max="9"
                        onChange={(e) => {
                          handleQty(e.target.value);
                        }}
                      />
                      <button
                        className="btn btn-sm btn-outline-danger"
                        type="button"
                        onClick={handlePlusClick}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-end">Price: ${selectedFood.price}</p>

                    {selectedFood.foodCustomization.map((x) => (
                      <div
                        key={JSON.stringify(x)}
                        className="form-check text-end"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id={"check" + x.name}
                          onChange={(e) =>
                            handleCustomization(
                              e.target.checked,
                              x.name,
                              x.price
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={"check" + x.name}
                        >
                          {x.name + " $" + x.price}
                        </label>
                      </div>
                    ))}
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Remarks"
                        id="floatingTextarea"
                      ></textarea>
                      <label htmlFor="floatingTextarea">Remarks</label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger w-100"
                      onClick={() => handlePayment()}
                    >
                      {"Pay $" + total}
                    </button>
                    <button
                      id="btnCloseModal"
                      type="button"
                      className="d-none"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const numberStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-star-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    );
  }
  return stars;
};

export default Menu;
