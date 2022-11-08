import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav id="nav" className="navbar">
      <div className="container-fluid mx-2">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img
              src={logo}
              alt="Logo"
              width="200rem"
              height="80rem"
              className="d-inline-block align-top"
            />
          </span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <div>
              <Link to="/signup">
                <button className="schedulebutton btn btn-primary mx-2">
                  Sign Up
                </button>
              </Link>
              <Link className="navLink mx-2" to="/login">
                <button className="outButton btn btn-outline-primary mx-2">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <a
                  id="sessionLink"
                  className="navLink dropdown-toggle mx-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sessions
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="navLink dropdown-item" to="/sessions">
                      Schedule a Session
                    </Link>
                  </li>
                  <li>
                    <Link className="navLink dropdown-item" to="/mysessions">
                      My Sessions
                    </Link>
                  </li>
                </ul>
              </div>
              <Link to="/profile">
                <button className="schedulebutton btn btn-danger mx-2">
                  Profile
                </button>
              </Link>
              <button
                className="outButton btn btn-outline-primary mx-2"
                onClick={() => actions.logout()}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
