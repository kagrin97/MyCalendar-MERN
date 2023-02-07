import Button from "./Button";
import Card from "./Card";

import "./CalendarCard.css";

export default function CalendarCard(props: any) {
  return (
    <div className="calendar-card__container">
      <Card className="CalendarCard">
        <h3>{props.cardContents && props.cardContents.title}</h3>
        <Button onClick={props.onClick}>상세보기</Button>
      </Card>
    </div>
  );
}
