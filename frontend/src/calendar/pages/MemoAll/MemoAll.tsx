import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MemoAll.css";
import MemoAllView from "./MemoAllView";

import { useAuth } from "../../../common/hooks/auth-hook";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { getAllCalendarHandler } from "../../../common/api/calendarApi";
import { CalendarType } from "../../../common/types/calendar";
import { useCalendarState } from "../../../common/context/calendarContext";

export default function MemoAll() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const { isLoading, sendRequest } = useHttpClient();

  const [calendarList, setCalendarList] = useState(useCalendarState());

  const SortDescendingByDate = (foundList: CalendarType[]) => {
    return foundList.sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return dateB - dateA;
    });
  };

  useEffect(() => {
    const getMyMemo = async () => {
      try {
        const foundList = await getAllCalendarHandler(userId, sendRequest);
        const sortedList = SortDescendingByDate(Object.values(foundList));
        setCalendarList(sortedList);
      } catch (err) {}
    };
    if (calendarList.length === 0) {
      getMyMemo();
    } else {
      const sortedList = SortDescendingByDate(Object.values(calendarList));
      setCalendarList(sortedList);
    }
  }, []);

  const onClickDetail = (calendar: CalendarType) => {
    if (calendar) {
      const createdDate = calendar.createdDate;
      navigate("/detail", {
        state: {
          calendar,
          createdDate,
        },
      });
    }
  };

  const props = {
    isLoading,
    calendarList,
    onClickDetail,
  };

  return <MemoAllView {...props} />;
}
