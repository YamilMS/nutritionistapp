import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import loginImg from "../../img/personalnutrition.jpg"

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickLogin = () => {
    actions.login(email, password);
  };
  if (store.token !== "" && store.token !== undefined && store.token !== null)
    navigate("/");

  return (
    <div style={{backgroundImage: "url("+ loginImg +")", backgroundRepeat: "no-repeat", backgroundPosition: "center",}}>
      <h2 className="mx-auto w-50 mt-5 text-white">Login</h2>
      <form className="mx-auto w-50">
        <div className="form-group bg-success p-7 text-white bg-opacity-10 shadow-lg p-3 mb-5 bg-body rounded">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control bg-danger p-2 text-white bg-opacity-10"
            id="loginInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group bg-success p-2 text-white bg-opacity-10 shadow-lg p-3 mb-5 bg-body rounded">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control bg-danger p-2 text-dark bg-opacity-10 text-white"
            id="loginInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClickLogin}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
