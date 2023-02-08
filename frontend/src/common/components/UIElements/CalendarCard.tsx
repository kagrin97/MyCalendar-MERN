import Button from "./Button";
import Card from "./Card";

import "./CalendarCard.css";

import minusToDot from "../../utils/minusToDot";

export default function CalendarCard(props: any) {
  return (
    <div className="calendar-card__container">
      <Card className="CalendarCard">
        <div className="calendar-card__contents">
          <span>{minusToDot(props.cardContents.createdDate)}</span>
          <h3>{props.cardContents && props.cardContents.title}</h3>
        </div>
        <Button onClick={props.onClick}>상세보기</Button>
      </Card>
    </div>
  );
}
