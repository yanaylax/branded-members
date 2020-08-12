import React from "react";
import useStyles from "../hooks/useStyles";

const { StyledInput } = useStyles();

export default function DesignatedInput({ name, value }) {
  return (
    <StyledInput
      id="standard-basic"
      label={value}
    />
  );
}
