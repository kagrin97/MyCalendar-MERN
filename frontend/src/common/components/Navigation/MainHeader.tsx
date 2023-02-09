import React from "react";

import "./MainHeader.css";

const MainHeader = (props: React.PropsWithChildren<{}>) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
