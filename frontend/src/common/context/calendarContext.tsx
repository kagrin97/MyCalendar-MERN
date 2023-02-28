import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { CalendarType } from "../types/calendar";

const initialCalendarState: any = [];

type CalendarActionType =
  | { type: "SET_CALENDAR_SUCCESS"; data: CalendarType[] }
  | { type: "SET_CALENDAR_ERROR" };

type CalendarDispatchType = Dispatch<CalendarActionType>;

const CalendarStateContext = createContext<CalendarType[] | null>(null);
const CalendarDispatchContext = createContext<CalendarDispatchType | null>(
  null
);

function calendarReducer(
  state: CalendarType[],
  action: CalendarActionType
): CalendarType[] {
  switch (action.type) {
    case "SET_CALENDAR_SUCCESS":
      return action.data;
    case "SET_CALENDAR_ERROR":
      return initialCalendarState;

    default:
      return state;
  }
}

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(calendarReducer, initialCalendarState);

  return (
    <CalendarStateContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {children}
      </CalendarDispatchContext.Provider>
    </CalendarStateContext.Provider>
  );
}

export function useCalendarState(): CalendarType[] {
  const state = useContext(CalendarStateContext);
  if (!state) {
    throw new Error("Cannot find CalendarProvider");
  }
  return state;
}

export function useCalendarDispatch(): CalendarDispatchType {
  const dispatch = useContext(CalendarDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find CalendarProvider");
  }
  return dispatch;
}
