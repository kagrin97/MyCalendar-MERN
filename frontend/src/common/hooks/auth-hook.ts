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
  const TWELEVE_HOURS_MILLI_SECONDS = 1000 * 60 * 60 * 12;

  const { token, userId, name, avatar } = useAuthState();

  const dispatch = useAuthDispatch();

  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    string | Date | null
  >();

  const saveTokenInLocalStorage = ({
    userId,
    token,
    expirationDate,
    name,
    avatar,
  }: LoginPropsTypes) => {
    const tokenExpirationDate =
      expirationDate ||
      new Date(new Date().getTime() + TWELEVE_HOURS_MILLI_SECONDS);
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
  };

  const login = useCallback(
    ({ userId, token, expirationDate, name, avatar }: LoginPropsTypes) => {
      saveTokenInLocalStorage({ userId, token, expirationDate, name, avatar });
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

  const startLogoutTimer = (tokenExpirationDate: string | Date) => {
    const remainingTime =
      new Date(tokenExpirationDate).getTime() - new Date().getTime();
    logoutTimer = setTimeout(logout, remainingTime);
  };

  useEffect(() => {
    if (token && tokenExpirationDate) {
      startLogoutTimer(tokenExpirationDate);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate, startLogoutTimer]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData") || "");

    const checkTokenAndRelogin = () => {
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
    };

    checkTokenAndRelogin();
  }, [login]);

  return { token, login, logout, userId, name, avatar };
};
