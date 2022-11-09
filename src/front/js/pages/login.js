import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import loginImg from "../../img/personalnutrition.jpg";

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

  console.log(store.id);

  return (
    <div className="h-100">
      <div
        className="container rounded"
        style={{
          backgroundImage: "url(" + loginImg + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "1.5rem",
        }}
      >
        <h2 className="mx-auto w-50 mt-5 text-dark">Login</h2>
        <form className="mx-auto w-50">
          <div className="form-group bg-success text-dark bg-opacity-10 bg-body">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control bg-danger p-2 text-dark bg-opacity-10 shadow-lg"
              id="loginInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-dark mb-5">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group bg-success text-dark bg-opacity-10 bg-body rounded">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control bg-danger p-2 text-dark bg-opacity-10 text-dark"
              id="loginInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="schedulebutton btn btn-primary my-2 sm"
            onClick={handleClickLogin}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
