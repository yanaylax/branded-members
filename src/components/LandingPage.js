import React from "react";
import Login from "./Login";
import Register from "./Register";
import {UserList} from "./ReduxTest";



export default function LandingPage() {
  return (
    <div>
        <UserList/>
        <Register/>
    </div>
  );
}
