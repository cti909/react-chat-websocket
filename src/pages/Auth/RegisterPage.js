import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/Auth/LoginForm";
import "../../assets/css/login.css";
import RegisterForm from "../../components/Auth/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleClickLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  // const handleClickHome = (e) => {
  //   e.preventDefault();
  //   navigate("/");
  // };
  return (
    <section className="backgound-image">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div
              className="card p-5 bg-dark text-white"
              style={{ borderRadius: "15px", opacity: 0.8 }}
            >
              <h1 className="text-uppercase text-center mb-3">Register</h1>
              <RegisterForm />
              {/* <div className="d-flex justify-content-end mt-2">
                <Link
                  className="text-white-50"
                  href="/"
                  onClick={handleClickHome}
                >
                  Back to home
                </Link>
              </div> */}
              <p className="mb-4 text-center mt-4">
                Don't have an account?
                <Link
                  href="/login"
                  className="ms-1 text-white-50 fw-bold"
                  onClick={handleClickLogin}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
