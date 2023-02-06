import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import CalendarItem from "../components/CalendarItem";

export default function CalendarDetail() {
  const {
    state: { calendar, calendarDate },
  } = useLocation();

  const [calendarItem, setCalendarItem] = useState(calendar);

  return (
    <div>
      <CalendarItem
        calendar={calendarItem}
        setCalendar={setCalendarItem}
        calendarDate={calendarDate}
      />
    </div>
  );
}
