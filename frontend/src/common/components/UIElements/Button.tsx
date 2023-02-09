import React from "react";

import "./Button.css";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  inverse?: boolean;
  danger?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (arg0: any) => void;
  children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"} `}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
