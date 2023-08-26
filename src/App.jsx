import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { Menu } from "./pages/menu/Menu";

function getUser() {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }

  return user;
}

const App = () => {
  const [user, setUser] = useState(getUser());

  return (
    <div className="wrapper center">
      <Router>
        <Routes>
          {user ? (
            <Route path="/" element={<Menu />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
