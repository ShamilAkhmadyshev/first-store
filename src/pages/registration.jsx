import React from "react";
import { NavLink } from "react-router-dom";
import RegisterForm from "../app/ui/registerForm";
const RegistrationPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <>
            <h3 className="mb-4">Register</h3>
            <RegisterForm />
            <p>
              Already have account? <NavLink to={"/login"}> Sign In</NavLink>
            </p>
          </>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
