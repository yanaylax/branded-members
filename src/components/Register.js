import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { userAdded } from "../features/usersSlice";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const getAge = (DOB) => {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  };

  const newUser = (data) => {
    const { firstName, lastName, email, password, birthday } = data;

    alert("Register succesful");
  };

  // const checkEmail = (data, exists) => {
  //   return exists
  //     ?
  //     : newUser(data);
  // };

  const onSubmit = (data) => {
    const { firstName, lastName, email, password, birthday } = data;
    let exists = false;

    if (getAge(birthday) < 6 || getAge(birthday) > 140) {
      return alert("Illegal birthday entered");
    }
    users.map((user) => {
      if (user.email === email) {
        exists = true;
      }
    });
    if (exists) {
      return alert("Email already exists, please log in");
    }
    dispatch(
      userAdded({
        id: nanoid(),
        firstName,
        lastName,
        email,
        password,
        birthday,
        age: getAge(birthday),
      })
    );
    return alert("Registration successful! Please log in to continue");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({
                  required: true,
                  pattern: /[A-Z][a-z]+\b/,
                })}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              <div className={classes.root}>
                {errors.firstName && errors.firstName.type === "required" && (
                  <Alert severity="error">Required</Alert>
                )}
                {errors.firstName && errors.firstName.type === "pattern" && (
                  <Alert severity="error">
                    Must be at least 2 letters and start with a capital letter
                  </Alert>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({
                  required: true,
                  pattern: /[A-Z][a-z]+\b/,
                })}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
              <div className={classes.root}>
                {errors.lastName && errors.lastName.type === "required" && (
                  <Alert severity="error">Required</Alert>
                )}
                {errors.lastName && errors.lastName.type === "pattern" && (
                  <Alert severity="error">
                    Must be at least 2 letters and start with a capital letter
                  </Alert>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({
                  required: true,
                  pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                })}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <div className={classes.root}>
                {errors.email && errors.email.type === "required" && (
                  <Alert severity="error">Required</Alert>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <Alert severity="error">Illegal email address</Alert>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                })}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <div className={classes.root}>
                {errors.password && errors.password.type === "required" && (
                  <Alert severity="error">Required</Alert>
                )}

                {errors.password && errors.password.type === "pattern" && (
                  <Alert severity="error">
                    Must contain at least 1 capital letter and 1 number, minimum
                    length 8 characters
                  </Alert>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({
                  required: true,
                })}
                variant="outlined"
                required
                fullWidth
                id="date"
                name="birthday"
                label="Birthday"
                type="date"
                defaultValue=""
                className={classes.root}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className={classes.root}>
                {errors.birthday && errors.birthday.type === "required" && (
                  <Alert severity="error">Required</Alert>
                )}
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
