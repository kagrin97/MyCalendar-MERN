import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CalendarsView from "./CalendarsView";

import "react-calendar/dist/Calendar.css";
import "./Calendars.css";

import { useHttpClient } from "../../common/hooks/http-hook";
import { fomatDate } from "../../common/utils/fomatDate";
import { getAllCalendarHandler } from "../../common/api/calendarApi";
import { useAuth } from "../../common/hooks/auth-hook";

import { CalendarType } from "../../common/types/calendar";
import {
  useCalendarDispatch,
  useCalendarState,
} from "../../common/context/calendarContext";

export default function Calendars() {
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState<string | undefined>();
  const [calendarList, setCalendarList] = useState(useCalendarState());
  const [cardContents, setCardContents] = useState<CalendarType>();
  const [showCard, setShowCard] = useState(false);

  const { userId, token } = useAuth();

  const { isLoading, sendRequest } = useHttpClient();

  const calendarDispatch = useCalendarDispatch();

  const getCalendarByDate = (day: Date) => {
    setCalendarDate(fomatDate(day));
    setShowCard(true);
  };

  const checkExistingCalendar = (date: Date) => {
    return (
      calendarList?.some((cal) => cal["createdDate"] === fomatDate(date)) ??
      false
    );
  };

  const onClickDetail = () => {
    if (cardContents) {
      navigate("/detail", {
        state: { calendar: cardContents, calendarDate },
      });
      return;
    }
    navigate("/detail", { state: { calendar: null, calendarDate } });
  };

  useEffect(() => {
    async function getAllCalendarList() {
      try {
        const foundList = await getAllCalendarHandler(userId, sendRequest);
        if (typeof foundList === "string") {
          throw new Error(foundList);
        }
        setCalendarList(foundList);
        calendarDispatch({ type: "SET_CALENDAR_SUCCESS", data: foundList });
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }

    const shouldFetchCalendarList = userId && calendarList.length === 0;
    if (shouldFetchCalendarList) {
      getAllCalendarList();
    }
  }, [userId, calendarList.length, calendarDispatch, sendRequest]);

  const getCalendarDetail = (
    calendarDate: string,
    calendarList: CalendarType[]
  ) => {
    return calendarList.find(
      (cal: CalendarType) => cal.createdDate === calendarDate
    );
  };

  useEffect(() => {
    if (calendarDate && calendarList.length > 0) {
      setCardContents(getCalendarDetail(calendarDate, calendarList));
    }
  }, [calendarDate, calendarList]);

  const props = {
    isLoading,
    token,
    onChange,
    value,
    getCalendarByDate,
    checkExistingCalendar,
    showCard,
    cardContents,
    onClickDetail,
  };

  return <CalendarsView {...props} />;
}
