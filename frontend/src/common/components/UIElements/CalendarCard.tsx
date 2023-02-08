import React from "react";

import Button from "./Button";
import Card from "./Card";

import "./CalendarCard.css";

import minusToDot from "../../utils/minusToDot";

export default function CalendarCard(props: any) {
  return (
    <div className="calendar-card__container">
      <Card className="CalendarCard">
        {props.cardContents ? (
          <React.Fragment>
            <div className="calendar-card__contents">
              <span>{minusToDot(props.cardContents.createdDate)}</span>
              <h3>{props.cardContents && props.cardContents.title}</h3>
            </div>
            <Button onClick={props.onClick}>상세보기</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="calendar-card__contents">
              <h3>아직 아무것도 작성되지 않았습니다.</h3>
            </div>
            <Button onClick={props.onClick}>작성하러 가기</Button>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
}
