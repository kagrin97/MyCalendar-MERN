import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainNavigation from "./common/components/Navigation/MainNavigation";
import BottomNavigation from "./common/components/Navigation/BottomNavigation";
import Auth from "./user/pages/Auth/Auth";
import Calendars from "./calendar/pages/Calendars/Calendars";

import { useAuth } from "./common/hooks/auth-hook";
import LoadingSpinner from "./common/components/UIElements/LoadingSpinner";

const MemoAll = React.lazy(() => import("./calendar/pages/MemoAll/MemoAll"));
const CalendarDetail = React.lazy(
  () => import("./calendar/pages/CalendarDetail/CalendarDetail")
);

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
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner asOverlay />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
      <BottomNavigation />
    </Router>
  );
}

export default App;
