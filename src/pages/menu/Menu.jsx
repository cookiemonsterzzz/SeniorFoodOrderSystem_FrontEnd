import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getMenuWithPreferences } from "../../redux/menu/MenuSlice";
import { useSelector } from "react-redux";

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.menu);

  React.useEffect(() => {
    dispatch(getMenuWithPreferences()).then((result) => {
      if (result.payload) {
        console.log(result.payload);
        setMenu(result.payload);
      }
    });
  }, []);

  return (
    <div className="container text-center">
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
          {menu &&
            menu.map((stall) => (
              <>
                <div className="row row-cols-1">
                  <div className="col">{stall.stallName}</div>
                  <div className="col">{numberStars(stall.rating)}</div>
                </div>
                <div className="row row-cols-2">
                  {stall.foods.map((food) => (
                    <>
                      <div className="salad-card">
                        <img src={food.image} alt={food.foodName} />
                        <div className="salad-detail-card">
                          <h3>{food.foodName}</h3>
                          <p>${food.price}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
};

const numberStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg
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
