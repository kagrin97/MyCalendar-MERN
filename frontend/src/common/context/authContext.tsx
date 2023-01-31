import React, { createContext, useReducer, useContext, Dispatch } from "react";

const initialAuthState = {
  isLoggedIn: false,
  userId: null,
  token: null,
};

// onSuccess
const success = (data: any) => ({
  isLoggedIn: true,
  userId: data.userId,
  token: data.token,
});

// onError
const error = () => ({
  isLoggedIn: false,
  userId: null,
  token: null,
});

const clean = () => ({
  isLoggedIn: false,
  userId: null,
  token: null,
});

type StateType = {
  isLoggedIn: Boolean;
  userId: string | null;
  token: string | null;
};

type ActionType =
  | { type: "SET_AUTH_SUCCESS"; data: { userId: string; token: string } }
  | { type: "SET_AUTH_ERROR" }
  | { type: "SET_AUTH_CLEAN" };

type DispatchType = Dispatch<ActionType>;

//  Context 생성
const AuthStateContext = createContext<StateType | null>(null);
const AuthDispatchContext = createContext<DispatchType | null>(null);

// reducer
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

// 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
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

// State를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) {
    throw new Error("Cannot find AuthProvider");
  }
  return state;
}

// Dispatch를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find AuthProvider");
  }
  return dispatch;
}
