import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

type Props = {
  onClick: () => void;
};

const Backdrop = (props: Props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook") as HTMLElement
  );
};

export default Backdrop;
