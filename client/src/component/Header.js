import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../navigation/Routes";
import "./Header.css";

function Header() {
  const [user, setUser] = useState({ id: "", role: "" });
  const navigate = useNavigate();
  useEffect(() => {
    let id = localStorage.getItem("id");
    let role = localStorage.getItem("role");
    if (id) setUser({ id: id, role: role });
  }, []);

  function renderMenu() {
    if (user?.role === "admin") {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.universityAdmin.name}>
              UniverSity Mangment <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.home.name}>
              User Managment
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.home.name}>
              Order Managment
            </Link>
          </li>
          {user.id && (
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.cart.name}>
                🛒
              </Link>
            </li>
          )}
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav mr-auto ">
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.first.name}>
              Home
            </Link>
          </li>

          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.home.name}>
              Services <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.about.name}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.contact.name}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.support.name}>
              Support
            </Link>
          </li>

          {user.id && (
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.cart.name}>
                🛒
              </Link>
            </li>
          )}
        </ul>
      );
    }
  }

  function renderButton() {
    if (user?.id) {
      return (
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          style={{
            backgroundColor: "red",
            border: "2px solid red",
            color: "white",
          }}
          onClick={() => {
            localStorage.clear();
            navigate(ROUTES.login.name);
          }}
        >
          LOGOUT
        </button>
      );
    } else {
      return (
        <>
          <Link
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            to={ROUTES.register.name}
            style={{
              backgroundColor: "lightblue",
              marginRight: "10px",
              color: "white",
            }}
          >
            REGISTER
          </Link>
          <Link
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            to={ROUTES.login.name}
            style={{ backgroundColor: "lightgreen", color: "white" }}
          >
            LOGIN
          </Link>
        </>
      );
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-danger ">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form> */}
          {renderMenu()}
          {renderButton()}
        </div>
      </nav>
    </>
  );
}

export default Header;
