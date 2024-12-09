import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Form.css";

const LoginForm: React.FC = () => {
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      formik.setFieldValue("email", savedEmail);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: (values) => {
      if (values.rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      toast("Successfully Logged In!", {
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
      <h2>Login</h2>
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            aria-required="true"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              onChange={formik.handleChange}
              checked={formik.values.rememberMe}
            />
            Remember Me
          </label>
        </div>
        <button type="submit" aria-label="Log in">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
