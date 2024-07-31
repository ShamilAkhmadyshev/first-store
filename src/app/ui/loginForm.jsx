import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validator } from "../utils/validator";
import TextField from "../../components/form/textField";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email is required",
      },
    },
    password: {
      isRequired: {
        message: "Password is required",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await logIn(data);
      navigate("/first-store");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={"Email"}
        name={"email"}
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label={"Password"}
        name={"password"}
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        type="password"
      />
      <button
        disabled={!isValid}
        type="submit"
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
