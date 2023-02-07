import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainNavigation from "./common/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import Calendars from "./calendar/pages/Calendars";
import CalendarDetail from "./calendar/pages/CalendarDetail";
import MemoAll from "./calendar/pages/MemoAll";

import { useAuth } from "./common/hooks/auth-hook";

function App() {
  const { token } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Calendars />} />
        <Route path="/detail" element={<CalendarDetail />} />
        <Route path="/My-all-calendar-memo" element={<MemoAll />} />
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
