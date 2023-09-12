import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { registerAction } from "../../store/actions/authAction";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const isRegister = useSelector((state) => state.auth.isRegister);

  useEffect(() => {
    if (isRegister) {
      return navigate("/");
    }
  }, [isRegister]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
    phone_number: Yup.string().required("Please enter your phone number"),
    address: Yup.string().required("Please enter your address"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phone_number = e.target.phone_number.value;
    const address = e.target.address.value;
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      phone_number !== "" &&
      address !== ""
    )
      await dispatch(
        registerAction({
          name: name,
          email: email,
          password: password,
          phone_number: phone_number,
          address: address,
        })
      );
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
          {/* name */}
          <div className="mb-3 posision-relative">
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              className="form-control"
              name="name"
              placeholder="Your name"
            />
            {(errors.name && touched.name) || (isSubmitForm && !values.name) ? (
              <div
                className="alert alert-danger position-absolute"
                role="alert"
              >
                {errors.name || "Name is required"}
              </div>
            ) : null}
          </div>
          {/* email */}
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
          {/* password */}
          <div className="mb-3 posision-relative">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              className="form-control"
              name="password"
              placeholder="Your password"
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
          {/* phone_number */}
          <div className="mb-3 posision-relative">
            <label htmlFor="phone_number">Phone number</label>
            <Field
              type="text"
              className="form-control"
              name="phone_number"
              placeholder="Your phone number"
            />
            {(errors.phone_number && touched.phone_number) ||
            (isSubmitForm && !values.phone_number) ? (
              <div
                className="alert alert-danger position-absolute"
                role="alert"
              >
                {errors.phone_number || "Phone number is required"}
              </div>
            ) : null}
          </div>
          {/* address */}
          <div className="mb-3 posision-relative">
            <label htmlFor="address">Address</label>
            <Field
              type="text"
              className="form-control"
              name="address"
              placeholder="Your address"
            />
            {(errors.address && touched.address) ||
            (isSubmitForm && !values.address) ? (
              <div
                className="alert alert-danger position-absolute"
                role="alert"
              >
                {errors.address || "Address is required"}
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

export default RegisterForm;
