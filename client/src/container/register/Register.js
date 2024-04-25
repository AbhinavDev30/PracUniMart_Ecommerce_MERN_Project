import React, { useState } from "react";
import Header from "../../component/Header";
import { useNavigate } from "react-router-dom";
// import ROUTES from "../../navigation/Routes";
import axios from "axios";
import ROUTES from "../../navigation/Routes";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",  
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function saveUser() {
    axios
      .post("http://localhost:8000/register", form)
      .then((d) => {
        alert("User registration successful");
        navigate(ROUTES.login.name);
      })
      .catch((e) => {
        alert("Something went wrong while registering");
      });
  }

  function onUserSubmit() {
    let errors = false;
    let error = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (form.firstName.trim().length === 0) {
      errors = true;
      error = {
        ...error,
        firstName: "Enter Valid First Name",
      };
    }
    if (form.lastName.trim().length === 0) {
      errors = true;
      error = {
        ...error,
        lastName: "Enter Valid Last Name",
      };
    }
    if (form.email.trim().length === 0) {
      errors = true;
      error = {
        ...error,
        email: "Enter Valid Email",
      };
    }
    if (form.password.trim().length === 0) {
      errors = true;
      error = {
        ...error,
        password: "Password Empty",
      };
    }
    if (form.confirmPassword.trim().length === 0) {
      errors = true;
      error = {
        ...error,
        confirmPassword: "Confirm Password Invalid",
      };
    }
    if (form.password !== form.confirmPassword) {
      errors = true;
      error = {
        ...error,
        confirmPassword: "Password and confirm password must match",
      };
    }
    if (form.password.length < 6 && form.password.length > 12) {
      errors = true;
      error = {
        ...error,
        password: "",
      };
    }
    if (errors) {
      setFormError(error);
    } else {
      saveUser();
    }
  }
  return (
    <>
      <Header />
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="firstName"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                        />
                        <p className="text-danger">{formError.firstName}</p>
                        <label className="form-label" htmlFor="form3Example1cg">
                          First Name
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="lastName"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                        />
                        <p className="text-danger">{formError.firstName}</p>
                        <label className="form-label" htmlFor="form3Example1cg">
                          Last Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                        />
                        <p className="text-danger">{formError.email}</p>
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                        />
                        <p className="text-danger">{formError.password}</p>
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="confirmPassword"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                        />
                        <p className="text-danger">
                          {formError.confirmPassword}
                        </p>
                        <label
                          className="form-label"
                          htmlFor="form3Example4cdg"
                        >
                          Repeat your password
                        </label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3cg"
                        >
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          onClick={() => {
                            onUserSubmit();
                          }}
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a href="#!" className="fw-bold text-body">
                          <u>Login here</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
