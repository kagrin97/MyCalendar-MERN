import { useState, useCallback, useEffect } from "react";

import { useAuthState, useAuthDispatch } from "../context/authContext";

interface LoginPropsTypes {
  userId: string;
  token: string;
  expirationDate?: string;
  name: string;
  avatar: string;
}

export const useAuth = () => {
  const { token, userId, name, avatar } = useAuthState();

  const dispatch = useAuthDispatch();

  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    string | Date | null
  >();

  const login = useCallback(
    ({ userId, token, expirationDate, name, avatar }: LoginPropsTypes) => {
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 12);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId,
          token,
          expiration: tokenExpirationDate,
          name,
          avatar,
        })
      );
      dispatch({
        type: "SET_AUTH_SUCCESS",
        data: { userId, token, name, avatar },
      });
    },
    []
  );

  const logout = useCallback(() => {
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
    dispatch({ type: "SET_AUTH_CLEAN" });
  }, []);

  let logoutTimer: NodeJS.Timeout;

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const userData = localStorage.getItem("userData") || "";
    let storedData;
    if (userData) {
      storedData = JSON.parse(userData);
    }

    if (
      storedData &&
      storedData.token &&
      storedData.expiration > new Date().toISOString()
    ) {
      login({
        userId: storedData.userId,
        token: storedData.token,
        expirationDate: storedData.expiration,
        name: storedData.name,
        avatar: storedData.avatar,
      });
    }
  }, [login]);

  return { token, login, logout, userId, name, avatar };
};
