import React from "react";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  return (
    <h1>
      Login or <NavLink to={"/first-store/registration"}>Register</NavLink>
    </h1>
  );
};

export default LoginForm;
