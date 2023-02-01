import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { useAuthState } from "../../context/authContext";
import "./NavLinks.css";
import { useAuth } from "../../hooks/auth-hook";

const NavLinks = (props: any) => {
  const auth = useAuthState();
  const { logout } = useAuth();

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">유저 목록</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/calendar`}>나의 캘린더</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">회원가입 / 로그인</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
