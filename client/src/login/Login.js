import React, { useState } from "react";
import Header from "../component/Header";
// import axios from "axios";
import ROUTES from "../navigation/Routes";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  let [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function loginUser() {
    try {
      axios
        .post("http://localhost:8000/login", form)
        .then((d) => {
          alert(d.data.id);
          localStorage.setItem("id", d.data.id);
          localStorage.setItem("role", d.data.role);
          if (d.data.role === "admin") {
            navigate(ROUTES.universityAdmin.name);
            console.log("Redirecting to userAdministrator ");
          } else {
            console.log("Redirecting to home");
            navigate(ROUTES.home.name);
          }
        })
        .catch((e) => {
          alert("Wrong user/password");
          setForm({ ...form, email: "", password: "" });
        });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  let onLoginSubmit = (e) => {
    e.preventDefault();
    let errors = false;
    let error = {
      email: "",
      password: "",
    };

    if (form.email.trim().length === 0) {
      errors = true;
      error = { ...error, email: "Enter Valid email" };
    }

    if (form.password.trim().length === 0) {
      errors = true;
      error = { ...error, password: "Enter Valid Password" };
    }

    if (errors) {
      setFormError(error);
    } else {
      // setFormError({ email: "", password: "" });
      loginUser();
    }
  };

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
                          name="email"
                          value={form.email}
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                        />
                        <p className="text-danger">{formError.email}</p>
                        <label className="form-label" htmlFor="form3Example1cg">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          value={form.password}
                          name="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                        />
                        <p className="text-danger">{formError.password}</p>
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
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
                          <Link href="#!" className="text-body">
                            <u>Terms of service</u>
                          </Link>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          onClick={(e) => {
                            onLoginSubmit(e);
                          }}
                        >
                          Login
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <Link to className="fw-bold text-body">
                          <u>Login </u>
                        </Link>
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

export default Login;
