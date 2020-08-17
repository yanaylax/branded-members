import React from "react";
import { Typography, Box } from "@material-ui/core";
import { useStylesClubDesc } from "../hooks/useStyles";

export default function ClubDesc() {
  const classes = useStylesClubDesc();
  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Welcome to Branded Members
      </Typography>

      <Typography variant="body1">
        Hello and welcome potential member!
        Our members have access to an endless amount of items (mostly edibles).
        Feel free to join our club today!
        Already a member? Sign in!
      </Typography>
      <Box className={classes.club}>
        <Typography className={classes.title} variant="h3">
          Become a member
        </Typography>
        <Typography variant="body1">
          Join our members club now to receive INCREDIBLE offerings on our products!
          New items every.. certain amount of time? 
          Don't worry, we got this!
        </Typography>
      </Box>
    </Box>
  );
}
