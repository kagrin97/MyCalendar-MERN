import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { AuthProvider } from "./common/context/authContext";
import { CalendarProvider } from "./common/context/calendarContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <CalendarProvider>
      <App />
    </CalendarProvider>
  </AuthProvider>
);

serviceWorkerRegistration.register();
