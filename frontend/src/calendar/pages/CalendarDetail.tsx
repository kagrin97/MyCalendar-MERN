import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./CalendarDetail.css";

import CalendarItem from "../components/CalendarItem";

export default function CalendarDetail() {
  const {
    state: { calendar, calendarDate },
  } = useLocation();

  const [calendarItem, setCalendarItem] = useState(calendar);

  return (
    <div className="calendar-detail">
      <CalendarItem
        calendar={calendarItem}
        setCalendar={setCalendarItem}
        calendarDate={calendarDate}
      />
    </div>
  );
}
