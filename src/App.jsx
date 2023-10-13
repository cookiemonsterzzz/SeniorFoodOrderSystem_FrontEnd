import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Payment from "./pages/payment/Payment";
import Order from "./pages/order/Order";
import OrderDetail from "./pages/order/OrderDetail";
import Enquiry from "./pages/enquiry/Enquiry";

function getUser() {
  let token = localStorage.getItem("token");
  var userInfo = token ? parseJwt(token) : null;
  if (userInfo && validateTokenExpiration(userInfo["exp"])) {
    //localStorage.clear();
    //return null;
  }
  return userInfo;
}

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

function validateTokenExpiration(exp) {
  return Date.now() >= exp * 1000;
}

const App = () => {
  const [user, setUser] = useState(getUser());

  const retriveCurrentUser = () => {
    setUser(getUser());
  };

  React.useEffect(() => {
    window.addEventListener("userToken", retriveCurrentUser);

    return () => {
      window.removeEventListener("userToken", retriveCurrentUser);
    };
  }, []);

  return (
    <div className="wrapper center">
      <Router>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Menu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/detail" element={<OrderDetail />}></Route>
              <Route path="/enquiry" element={<Enquiry />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
