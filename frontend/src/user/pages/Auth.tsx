import { useState } from "react";
import { useForm } from "react-hook-form";

import Signup from "../components/Signup";
import Login from "../components/Login";

export default function Auth() {
  const [authMode, setAuthMode] = useState(true);

  const toggleAuthMode = () => {
    setAuthMode(!authMode);
  };

  return (
    <div>
      {authMode ? <Signup /> : <Login />}
      <button onClick={toggleAuthMode}>로그인으로 전환</button>
    </div>
  );
}
