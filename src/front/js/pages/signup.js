import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState("");

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
                id="exampleInputName"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Client Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Client Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <div className="form-group mb-2">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="exampleFormControlFile1">
                Upload a profile picture
              </label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
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
                id="exampleInputName"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Nutritionist Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Nutritionist Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <div className="form-group mb-2">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="exampleFormControlFile1">
                Upload a profile picture
              </label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
