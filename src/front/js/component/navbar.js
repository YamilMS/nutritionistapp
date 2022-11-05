import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav id="nav" className="navbar">
      <div className="container w-100 mx-0">
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
              <Link className="navLink mx-2" to="/login">
                <a>Login</a>
              </Link>
              <Link to="/signup">
                <button className="schedulebutton btn btn-primary mx-2">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark">
                      <li>
                        <a class="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <a className="dropdown-toggle" aria-expanded="false">
                  Sessions
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/sessions">
                      <a className="dropdown-item" href="#">
                        Schedule a Session
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/mysessions">
                      <a className="dropdown-item" href="#">
                        My Sessions
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <Link to="/profile">
                <button id="buttonProfile" className="btn btn-danger m-2">
                  Profile
                </button>
              </Link>
              <button
                id="buttonLogOut"
                className="btn btn-warning m-2"
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
