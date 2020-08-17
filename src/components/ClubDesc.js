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
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Box className={classes.club}>
        <Typography className={classes.title} variant="h3">
          {" "}
          Become a member
        </Typography>
        <Typography variant="body1">
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
      </Box>
    </Box>
  );
}
