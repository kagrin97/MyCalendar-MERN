import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { useAuth } from "../../hooks/auth-hook";

const NavLinks = (props: any) => {
  const { token, logout, userId } = useAuth();

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">나의 캘린더</NavLink>
      </li>
      {token && (
        <li>
          <NavLink to={`/${userId}/calendar`}>나의 캘린더</NavLink>
        </li>
      )}
      {!token && (
        <li>
          <NavLink to="/auth">회원가입 / 로그인</NavLink>
        </li>
      )}
      {token && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
