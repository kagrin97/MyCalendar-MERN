import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import MainNavigation from "./common/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import Home from "./user/pages/Home";

import { useAuth } from "./common/hooks/auth-hook";

function App() {
  const { token } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }
  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  );
}

export default App;
