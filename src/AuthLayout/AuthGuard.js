import * as React from "react";
import { Navigate } from "react-router-dom";
function AuthGuard({ children }) {
  const [activeUser] = React.useState(localStorage.getItem("activeUser"));
  const [token] = React.useState(localStorage.getItem("token"));

  if (!activeUser && !token) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
