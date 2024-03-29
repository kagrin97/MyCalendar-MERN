import React from "react";

import Button from "./Button";
import Card from "./Card";

import "./CalendarCard.css";

import minusToDot from "../../utils/minusToDot";

import { CalendarType } from "../../types/calendar";

interface CalendarCardProps {
  cardContents: CalendarType | null;
  onClick?: () => void;
}

export default function CalendarCard(props: CalendarCardProps) {
  const isCardContents = () => {
    if (props.cardContents) {
      return (
        <React.Fragment>
          <div className="calendar-card__contents">
            <span>{minusToDot(props.cardContents.createdDate)}</span>
            <h3>{props.cardContents && props.cardContents.title}</h3>
          </div>
          <div className="block-center">
            <Button size="small" onClick={props.onClick}>
              상세보기
            </Button>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="calendar-card__contents">
          <h3>제목 </h3>
        </div>
        <div className="block-center">
          <Button size="small" onClick={props.onClick}>
            작성하기
          </Button>
        </div>
      </React.Fragment>
    );
  };
  return (
    <div className="calendar-card__container">
      <Card className="CalendarCard">{isCardContents()}</Card>
    </div>
  );
}
