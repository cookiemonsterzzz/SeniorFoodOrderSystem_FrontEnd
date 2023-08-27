import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { Menu } from "./pages/menu/Menu";

function getUser() {
  let token = localStorage.getItem("token");
  return token ? parseJwt(token) : null;
}

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

const App = () => {
  const [user, setUser] = useState(getUser());

  return (
    <div className="wrapper center">
      <Router>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Menu />} />
              <Route path="/menu" element={<Menu />} />
            </>
          ) : (
            <Route path="/" element={<Home />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
