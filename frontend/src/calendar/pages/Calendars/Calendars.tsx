import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CalendarsView from "./CalendarsView";

import "react-calendar/dist/Calendar.css";
import "./Calendars.css";

import { useHttpClient } from "../../../common/hooks/http-hook";
import { fomatDate } from "../../../common/utils/fomatDate";
import { getAllCalendarHandler } from "../../../common/api/calendarApi";
import { useAuth } from "../../../common/hooks/auth-hook";

export default function Calendars() {
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState<string | undefined>();
  const [calendarList, setCalendarList] = useState([]);

  const { userId, token } = useAuth();

  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    async function getAllCalendarList() {
      try {
        const foundList = await getAllCalendarHandler(userId, sendRequest);
        if (typeof foundList === "string") {
          throw new Error(foundList);
        }
        setCalendarList(foundList);
      } catch (err: any) {
        console.error(err.message);
      }
    }
    if (userId) {
      getAllCalendarList();
    }
  }, [userId]);

  const [cardContents, setCardContents] = useState<any>();

  // setState를 동기로 받기위한 처리
  useEffect(() => {
    const getCalendarDetail = () => {
      const foundCalendar = calendarList.filter(
        (item: any) => item.createdDate === calendarDate
      )[0];
      setCardContents(foundCalendar);
    };
    if (calendarDate && calendarList.length > 0) {
      getCalendarDetail();
    }
  }, [calendarDate, calendarList]);

  const onClickDetail = () => {
    if (cardContents) {
      navigate("/detail", {
        state: { calendar: cardContents, calendarDate },
      });
      return;
    }
    navigate("/detail", { state: { calendar: null, calendarDate } });
  };

  const [showCard, setShowCard] = useState(false);

  const getCalendarByDate = (day: any) => {
    setCalendarDate(fomatDate(day));
    setShowCard(true);
  };

  const existingCalendar = (date: Date) => {
    if (calendarList) {
      for (let cal of calendarList) {
        if (cal["createdDate"] === fomatDate(date)) {
          return true;
        }
      }
    }
    return false;
  };

  const props = {
    isLoading,
    token,
    onChange,
    value,
    getCalendarByDate,
    existingCalendar,
    showCard,
    cardContents,
    onClickDetail,
  };

  return <CalendarsView {...props} />;
}
