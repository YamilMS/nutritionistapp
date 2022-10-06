import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img src="https://dcassetcdn.com/design_img/1588933/543535/543535_8440573_1588933_401cc4a9_image.jpg" alt="Logo" width="50" height="50" class="d-inline-block align-top" />
          </span>
        </Link>
        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-danger m-2">Login</button>
          </Link>
          <Link to="/signUp">
            <button className="btn btn-warning m-2">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
