import { useState } from "react";
import { useLocation } from "react-router-dom";

import CalendarDetailView from "./CalendarDetailView";

export default function CalendarDetail() {
  const {
    state: { calendar, calendarDate },
  } = useLocation();

  const [calendarItem, setCalendarItem] = useState(calendar);

  const props = {
    calendar: calendarItem,
    setCalendar: setCalendarItem,
    calendarDate: calendarDate,
  };

  return <CalendarDetailView {...props} />;
}
