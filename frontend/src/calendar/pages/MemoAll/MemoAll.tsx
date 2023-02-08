import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MemoAll.css";
import MemoAllView from "./MemoAllView";

import { useAuth } from "../../../common/hooks/auth-hook";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { getAllCalendarHandler } from "../../../common/api/calendarApi";

export default function MemoAll() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const { isLoading, sendRequest } = useHttpClient();

  const [calendarList, setCalendarList] = useState([]);

  useEffect(() => {
    const getMyMemo = async () => {
      const foundList = await getAllCalendarHandler(userId, sendRequest);
      setCalendarList(foundList);
    };
    getMyMemo();
  }, []);

  const onClickDetail = (calendar: any) => {
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
