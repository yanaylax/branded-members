import React, { useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ClubDesc from "./ClubDesc";

import { useStylesLogin } from "../hooks/useStyles";
import { login, admin } from "../features/loggedSlice";

import { useSelector } from "react-redux";

export default function SignInSide() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const classes = useStylesLogin();
  const users = useSelector((state) => state.users);
  const current = useSelector((state) => state.logged);
  const dispatch = useDispatch();

  const logIn = (email, password) => {
    if (email === "ADMIN" && password === "ADMIN") {
      return dispatch(admin());
    }
    users.map((user, index) => {
      return user.email === email && user.password === password
        ? dispatch(login({ index, users }))
        : user;
    });
  };

  if (current) {
    if (current === "ADMIN") {
      return <Redirect to="/products" />;
    }
    return <Redirect to="/shop" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={7} className={classes.club}>
        <ClubDesc />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              logIn(userInfo.email, userInfo.password);
            }}
            className={classes.form}
            noValidate
          >
            <TextField
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
