import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
const Index = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/auth/sign-in")}>SignIn</Button>
    </div>
  );
};

export default Index;
