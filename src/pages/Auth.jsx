import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useMatch, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks";

function Auth() {
  // Determine if the current route is for registration
  const isRegister = useMatch("/register");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form submission handler
  async function onSubmit(values, actions) {
    try {
      // API request to login or register
      const { data } = await axios.post(
        `http://localhost:3001/api/users${isRegister ? "" : "/login"}`,
        { user: values }
      );
      if (data.token) {
        window.localStorage.setItem('jwtToken', data.token);
        console.log("Token stored:", data.token); // Log the token
      }

      // Save the user data in auth state and navigate
      login(data.user);
      navigate("/");
    } catch (error) {
      console.error("Error while onSubmit: ", error);

      // Handle errors from the server
      const { status, data } = error.response || {};

      if (status === 422 && data.errors) {
        actions.setErrors(data.errors);
      } else {
        actions.setStatus({ message: "An unexpected error occurred." });
      }
    }
  }

  // Initial form values
  const loginInitialValues = { email: "", password: "" };

  return (
    <div className="auth-page container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Sign {isRegister ? "up" : "in"}</h1>
          <p className="text-center">
            <Link to={isRegister ? "/login" : "/register"}>
              {isRegister ? "Have" : "Need"} an account?
            </Link>
          </p>

          <Formik
            onSubmit={onSubmit}
            initialValues={
              isRegister
                ? { ...loginInitialValues, username: "" }
                : loginInitialValues
            }
          >
            {({ errors, touched, status }) => (
              <Form>
                {isRegister && (
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="username"
                      placeholder="Your Name"
                      className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                    />
                    {touched.username && errors.username ? (
                      <div className="invalid-feedback">{errors.username}</div>
                    ) : null}
                  </div>
                )}

                <div className="mb-3">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  />
                  {touched.email && errors.email ? (
                    <div className="invalid-feedback">{errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  {touched.password && errors.password ? (
                    <div className="invalid-feedback">{errors.password}</div>
                  ) : null}
                </div>

                {status && status.message && (
                  <div className="alert alert-danger">{status.message}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Sign {isRegister ? "up" : "in"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Auth;
