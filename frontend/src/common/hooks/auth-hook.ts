import { useState, useCallback, useEffect } from "react";

import { useAuthState, useAuthDispatch } from "../context/authContext";

export const useAuth = () => {
  const { token, userId } = useAuthState();

  const dispatch = useAuthDispatch();

  const [tokenExpirationDate, setTokenExpirationDate] = useState<any>();

  const login = useCallback(
    (uid: string, token: string, expirationDate?: string) => {
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 1);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate,
        })
      );
      dispatch({ type: "SET_AUTH_SUCCESS", data: { userId: uid, token } });
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
      login(storedData.userId, storedData.token, storedData.expiration);
    }
  }, [login]);

  return { token, login, logout, userId };
};
