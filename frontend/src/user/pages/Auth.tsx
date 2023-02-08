import { useState } from "react";

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
      {authMode ? <Login /> : <Signup />}
      <Button inverse onClick={toggleAuthMode}>
        {authMode ? "회원가입페이지로" : "로그인페이지로"}
      </Button>
    </Card>
  );
}
