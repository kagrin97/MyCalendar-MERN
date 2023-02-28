import React, { createContext, useReducer, useContext, Dispatch } from "react";

const initialAuthState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  name: null,
  avatar: null,
};

const success = (data: {
  userId: string;
  token: string;
  name: string;
  avatar: string;
}) => ({
  isLoggedIn: true,
  userId: data.userId,
  token: data.token,
  name: data.name,
  avatar: data.avatar,
});

const error = () => ({
  isLoggedIn: false,
  userId: null,
  token: null,
  name: null,
  avatar: null,
});

const clean = () => ({
  isLoggedIn: false,
  userId: null,
  token: null,
  name: null,
  avatar: null,
});

type StateType = {
  isLoggedIn: Boolean;
  userId: string | null;
  token: string | null;
  name: string | null;
  avatar: string | null;
};

type ActionType =
  | {
      type: "SET_AUTH_SUCCESS";
      data: { userId: string; token: string; name: string; avatar: string };
    }
  | { type: "SET_AUTH_ERROR" }
  | { type: "SET_AUTH_CLEAN" };

type DispatchType = Dispatch<ActionType>;

const AuthStateContext = createContext<StateType | null>(null);
const AuthDispatchContext = createContext<DispatchType | null>(null);

function AuthReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "SET_AUTH_SUCCESS":
      return {
        ...state,
        ...success(action.data),
      };
    case "SET_AUTH_ERROR":
      return {
        ...state,
        ...error(),
      };
    case "SET_AUTH_CLEAN":
      return {
        ...state,
        ...clean(),
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) {
    throw new Error("Cannot find AuthProvider");
  }
  return state;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find AuthProvider");
  }
  return dispatch;
}
