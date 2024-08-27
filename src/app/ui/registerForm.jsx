import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validator } from "../utils/validator";
import TextField from "../../components/form/textField";
import CheckBoxField from "../../components/form/checkBoxField";
import { useAuth } from "../hooks/useAuth";

const RegisterForm = () => {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
    license: false,
  });
  const handleChange = (target) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      navigate("/first-store");
    }
  }, [user, navigate]);

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
      isCapitalSymbol: {
        message: "Password must include capital symbol",
      },
      isContainDigit: {
        message: "Password must include number",
      },
      min: {
        message: "Password must include at least 8 symbols",
        value: 8,
      },
    },
    license: {
      isRequired: {
        message: "You should accept our terms",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    validate();
  }, [data]);
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    const isValid = validate();
    if (!isValid) return;
    try {
      await signUp(data);
      navigate("/first-store");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name={"email"}
        label={"Email"}
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        name={"password"}
        label={"Password"}
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        type="password"
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name={"license"}
        error={errors.license}
      >
        I agree with the terms
      </CheckBoxField>
      <button
        type="submit"
        className="btn btn-primary w-100 mx-auto"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
