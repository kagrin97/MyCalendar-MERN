import React, { CSSProperties } from "react";

import "./Card.css";

interface CardProps {
  className?: string | undefined;
  style?: CSSProperties | undefined;
  children?: React.ReactNode;
}

const Card = (props: CardProps) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
