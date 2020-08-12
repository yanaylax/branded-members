import React, { useState } from "react";
import useStyles from "../hooks/useStyles";
import DesignatedInput from "./DesignatedInput";

const { StyledButton, StyledInput } = useStyles();

export default function Login() {
  const [userInfo, setUserInfo] = useState({});

  return (
    <div>
      <DesignatedInput set={setUserInfo} value="Email"/>
      <DesignatedInput />
      <StyledButton variant="contained">Hello</StyledButton>
    </div>
  );
}
