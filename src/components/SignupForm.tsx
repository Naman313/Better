import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Form.css";

const SignupForm: React.FC = () => {
  const [passwordStrength, setPasswordStrength] = useState("");

  const evaluatePasswordStrength = (password: string) => {
    if (password.length >= 8 && /[A-Z]/.test(password) && /\W/.test(password)) {
      setPasswordStrength("Strong");
    } else if (password.length >= 6) {
      setPasswordStrength("Moderate");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: (values) => {
      toast("Sign Up Successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        },
      });
    },
  });

  return (
    <div className="container" role="main">
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            aria-required="true"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => {
              formik.handleChange(e);
              evaluatePasswordStrength(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            aria-required="true"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <div
            className={`password-strength ${
              passwordStrength === "Strong"
                ? "strong"
                : passwordStrength === "Moderate"
                ? "moderate"
                : "weak"
            }`}
            aria-live="polite"
          >
            Password Strength: {passwordStrength}
          </div>
        </div>
        <button type="submit" aria-label="Sign up">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
