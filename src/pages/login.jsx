import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "../app/ui/loginForm";

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <>
            <h3 className="mb-4">Login</h3>
            <LoginForm />
            <p>
              Dont have account?
              <NavLink to={"/registration"}> Sign Up</NavLink>
            </p>
          </>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
