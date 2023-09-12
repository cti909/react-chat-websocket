import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import "../../assets/css/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleClickRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  // const handleClickHome = (e) => {
  //   e.preventDefault();
  //   navigate("/");
  // };
  return (
    <section className="backgound-image">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ opacity: 0.8 }}>
              <div className="card-body p-5">
                <div className="mb-md-5 mt-md-4 pb-3">
                  <h1 className="fw-bold mb-2 text-uppercase text-center">
                    Login
                  </h1>
                  <p className="text-white-50 mb-4 text-center">
                    Please enter your login and password!
                  </p>

                  <LoginForm />

                  <div className="d-flex justify-content-between mt-2">
                    <Link className="text-white-50" href="#">
                      Forgot password?
                    </Link>
                    {/* <Link
                      className="text-white-50"
                      href="/"
                      onClick={handleClickHome}
                    >
                      Back to home
                    </Link> */}
                  </div>
                </div>
                <div>
                  <p className="text-center">
                    You have an account?
                    <Link
                      href="/register"
                      className="ms-1 text-white-50 fw-bold"
                      onClick={handleClickRegister}
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
