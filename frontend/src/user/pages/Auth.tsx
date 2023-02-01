import { useState } from "react";
import { useForm } from "react-hook-form";

import "./Auth.css";

import Signup from "../components/Signup";
import Login from "../components/Login";

import Card from "../../common/components/UIElements/Card";

export default function Auth() {
  const [authMode, setAuthMode] = useState(true);

  const toggleAuthMode = () => {
    setAuthMode(!authMode);
  };

  return (
    <Card>
      {authMode ? <Signup /> : <Login />}
      <button onClick={toggleAuthMode}>로그인으로 전환</button>
    </Card>
  );
}
