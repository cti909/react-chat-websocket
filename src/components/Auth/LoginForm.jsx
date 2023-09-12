import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { loginAction } from "../../store/actions/authAction";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (isLogin) {
      return navigate("/");
    }
  }, [isLogin, isSubmitForm]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email !== "" && password !== "")
      await dispatch(loginAction({ email: email, password: password }));
    setIsSubmitForm(true);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {({ values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3 posision-relative">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              className="form-control"
              name="email"
              placeholder="example@gmail.com"
            />
            {(errors.email && touched.email) ||
            (isSubmitForm && !values.email) ? (
              <div
                className="alert alert-danger position-absolute"
                role="alert"
              >
                {errors.email || "Email is required"}
              </div>
            ) : null}
          </div>

          <div className="mb-3 posision-relative">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
            />
            {(errors.password && touched.password) ||
            (isSubmitForm && !values.password) ? (
              <div
                className="alert alert-danger position-absolute"
                role="alert"
              >
                {errors.password || "Password is required"}
              </div>
            ) : null}
          </div>
          <Button
            type="submit"
            variant="secondary"
            className="form-control form-control-lg mt-3"
          >
            <strong>Sign in</strong>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
