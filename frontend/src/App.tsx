import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import MainNavigation from "./common/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import Calendars from "./calendar/pages/Calendars";

import { useAuth } from "./common/hooks/auth-hook";

function App() {
  const { token } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Calendars />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Calendars />} />
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
