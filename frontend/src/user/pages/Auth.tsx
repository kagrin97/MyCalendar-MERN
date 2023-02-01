import { useState } from "react";
import { useForm } from "react-hook-form";

import "./Auth.css";

import Signup from "../components/Signup";
import Login from "../components/Login";
import Button from "../../common/components/UIElements/Button";

import Card from "../../common/components/UIElements/Card";

export default function Auth() {
  const [authMode, setAuthMode] = useState(true);

  const toggleAuthMode = () => {
    setAuthMode(!authMode);
  };

  return (
    <Card className="center">
      {authMode ? <Signup /> : <Login />}
      <Button inverse onClick={toggleAuthMode}>
        {authMode ? "로그인페이지로" : "회원가입페이지로"}
      </Button>
    </Card>
  );
}
