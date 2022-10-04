import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Logo</span>
        </Link>
        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-danger">Login</button>
          </Link>
          <Link to="/signUp">
            <button className="btn btn-warning">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
