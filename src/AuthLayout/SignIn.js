import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
} from "@mui/material";
import { Api } from "../utils/Api";
import { Navigate } from "react-router";
const SignIn = () => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const handleOnSignIn = async () => {
    if (email.length > 0 && password.length > 0) {
      const response = await Api("post", `login`, user);
      if (response.status == 200 && response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("activeUser", JSON.stringify(response.data.data));

        setRedirect(true);
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <Card>
        <CardHeader title="Sign In" />
        <CardContent>
          <Grid container>
            {Object.entries(user).map((key, ind) => (
              <Grid sm={12} item sx={{ marginTop: 1 }} key={ind}>
                <TextField
                  value={key[1]}
                  label={key[0]}
                  onChange={(e) => {
                    user[key[0]] = e.target.value;
                    setUser({ ...user });
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: 1 }}
            onClick={handleOnSignIn}
          >
            Sign in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
