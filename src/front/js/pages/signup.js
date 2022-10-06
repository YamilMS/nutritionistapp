import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  if (token !== "" && token !== undefined && token !== null) navigate("/");

  const handleSignUp = () => {
    if ((name != "", email != "", password != "", description != "")) {
      fetch(
        `https://3001-4geeksacade-reactflaskh-h9ynin3nyz0.ws-eu67.gitpod.io/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            description: description,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => {
          console.log(resp.ok); // will be true if the response is successfull
          console.log(resp.status); // the status code = 200 or code = 400 etc.
          console.log(resp.text()); // will try return the exact result as string
          return resp; // (returns promise) will try to parse the result as json as return a promise that you can .then for results
        })
        .catch((error) => {
          //error handling
          console.log(error);
        });
    }
    setName("");
    setEmail("");
    setPassword("");
    setDescription("");
  };

  console.log("name: " + name);

  return (
    <div>
      <h2 className="mx-auto w-50 mt-5">Sign Up</h2>
      {/* 
                                TABS TO CHANGE THE VIEWS BETWEEN CLIENT AND NUTRITIONIST 
        */}

      <div className="row">
        <div className="d-flex justify-content-center bg-ligth pt-1">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="client-tab"
                data-bs-toggle="tab"
                data-bs-target="#client"
                type="button"
                role="tab"
                aria-controls="client"
                aria-selected="true"
              >
                Client
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="nutritionist-tab"
                data-bs-toggle="tab"
                data-bs-target="#nutritionist"
                type="button"
                role="tab"
                aria-controls="nutritionist"
                aria-selected="false"
              >
                Nutritionist
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content" id="myTabContent">
        {/*
                                         CLIENT VIEW OF SIGN UP 
        */}

        <div
          className="tab-pane fade show active"
          id="client"
          role="tabpanel"
          aria-labelledby="client-tab"
        >
          <form className="mx-auto w-50">
            <div className="form-group mb-2">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                className="form-control"
                id="clientInputName"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Client Email address</label>
              <input
                type="email"
                className="form-control"
                id="clientInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="clientEmailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Client Password</label>
              <input
                type="password"
                className="form-control"
                id="clientInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="clientCheck"
              />
              <label className="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <div className="form-group mb-2">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control"
                id="clientFormControlTextarea1"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="exampleFormControlFile1">
                Upload a profile picture
              </label>
              <input
                type="file"
                className="form-control-file"
                id="clientFormControlFile"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              Submit
            </button>
          </form>

          {/*
                                                 NUTRITIONIST VIEW OF SIGN UP 
            */}
        </div>
        <div
          className="tab-pane fade"
          id="nutritionist"
          role="tabpanel"
          aria-labelledby="nutritionist-tab"
        >
          <form className="mx-auto w-50">
            <div className="form-group mb-2">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                className="form-control"
                id="nutritionistInputName"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Nutritionist Email address</label>
              <input
                type="email"
                className="form-control"
                id="nutritionistInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small
                id="nutritionistEmailHelp"
                className="form-text text-muted"
              >
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Nutritionist Password</label>
              <input
                type="password"
                className="form-control"
                id="nutritionistInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="nutritionistCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <div className="form-group mb-2">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control"
                id="nutritionistFormControlTextarea1"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="exampleFormControlFile1">
                Upload a profile picture
              </label>
              <input
                type="file"
                className="form-control-file"
                id="nutritionistFormControlFile1"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
