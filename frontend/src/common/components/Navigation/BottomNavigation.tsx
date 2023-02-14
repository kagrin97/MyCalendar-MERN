import "./BottomNavigation.css";

import React from "react";
import { useAuth } from "../../hooks/auth-hook";

const BottomNavigation = () => {
  const { name, avatar } = useAuth();

  return (
    <nav className="bottom-nav__container center">
      {name && avatar ? (
        <React.Fragment>
          {name} 님 안녕하세요?
          <img src={avatar} alt="avatar" className="avatar" />
        </React.Fragment>
      ) : (
        "비 로그인 상태입니다."
      )}
    </nav>
  );
};

export default BottomNavigation;
