import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import img from "../../img/Cuvelier-Fruit-header1-3.png";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picInput, setPicInput] = useState(false);
  const [photo, setPhoto] = useState("");
  const [professional, setProfessional] = useState(false);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("client");
  const [days, setDays] = useState([]);
  const [time, setTime] = useState([]);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  if (token !== "" && token !== undefined && token !== null) navigate("/");

  const handleSignUp = () => {
    if (
      (firstName != "",
      lastName != "",
      email != "",
      password != "",
      description != "")
    ) {
      fetch(process.env.BACKEND_URL + "/api/" + user, {
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          professional: professional,
          days: days.join(""),
          times: time.join(","),
          description: description,
          photo: photo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setDescription("");
    setPhoto("");
  };

  console.log(picInput);

  return (
    <div
      className="opacity-100"
      style={{
        backgroundImage: "url(" + img + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="opacity-100">
        <h2 className="mx-auto w-50 mt-5 text-white">Sign Up</h2>
      </div>
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
                onClick={() => {
                  setUser("client");
                  setProfessional(false);
                }}
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
                onClick={() => {
                  setUser("nutritionist");
                  setProfessional(true);
                }}
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
          className="tab-pane fade show active p-4"
          id="client"
          role="tabpanel"
          aria-labelledby="client-tab"
        >
          <form className="mx-auto w-50">
            <div className="form-group mb-2">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <input
                type="text"
                className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                id="clientInputFirstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <input
                type="text"
                className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                id="clientInputLastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Client Email address</label>
              <input
                type="email"
                className="form-control text-dark bg-opacity-10 shadow-lg p-3 bg-body rounded"
                id="clientInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="clientEmailHelp" className="form-text text-muted mb-3">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1 p-3 mb-2 bg-light text-dark">
                Client Password
              </label>
              <input
                type="password"
                className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                id="clientInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                id="clientFormControlTextarea1"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group d-flex flex-column my-2">
              {picInput == false ? (
                <button type="submit" className="btn btn-primary">
                  <a
                    href="https://postimages.org/"
                    target="_blank"
                    style={{ color: "white" }}
                    onClick={() => setPicInput(true)}
                  >
                    {" "}
                    Click here to convert your photo to a URL
                  </a>
                </button>
              ) : (
                <div className="form-group mb-2">
                  <label htmlFor="exampleInputEmail1">
                    Paste the direct link:
                  </label>
                  <div className="d-flex m-0">
                    <input
                      type="text"
                      className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                      id="clientInputFirstName"
                      placeholder="Something like this:    https://i.postimg.cc/c1pL93zQ/your_file_name.jpg"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      style={{ height: "55px" }}
                      onClick={() => setPicInput(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
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
          className="tab-pane p-4"
          id="nutritionist"
          role="tabpanel"
          aria-labelledby="nutritionist-tab"
        >
          <form className="mx-auto w-50">
            <div className="form-group mb-2">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <input
                type="text"
                className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                id="nutritionistInputFirstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <input
                type="text"
                className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                id="nutritionistInputLastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1 text-dark bg-opacity-10 shadow-lg bg-body rounded">
                Nutritionist Email address
              </label>
              <input
                type="email"
                className="form-control text-dark bg-opacity-10 shadow-lg bg-body rounded"
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
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1">
                Nutritionist Password
              </label>
              <input
                type="password"
                className="form-control mb-2 text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                id="nutritionistInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <p className="mb-1">Select Time avalaible</p>
              <div className="d-flex">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckMonday"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setDays([...days, 1]);
                      } else {
                        setDays(days.filter((item) => item !== 1));
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckMonday"
                  >
                    Monday
                  </label>
                </div>
                <div className="form-group form-check mx-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckTuesday"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setDays([...days, 2]);
                      } else {
                        setDays(days.filter((item) => item !== 2));
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckTuesday"
                  >
                    Tuesday
                  </label>
                </div>
                <div className="form-group form-check mx-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckWednesday"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setDays([...days, 3]);
                      } else {
                        setDays(days.filter((item) => item !== 3));
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckWednesday"
                  >
                    Wednesday
                  </label>
                </div>
                <div className="form-group form-check mx-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckThursday"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setDays([...days, 4]);
                      } else {
                        setDays(days.filter((item) => item !== 4));
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckThursday"
                  >
                    Thursday
                  </label>
                </div>
                <div className="form-group form-check mx-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckFriday"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setDays([...days, 5]);
                      } else {
                        setDays(days.filter((item) => item !== 5));
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckFriday"
                  >
                    Friday
                  </label>
                </div>
                <div className="form-group form-check mx-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckSaturday"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setDays([...days, 6]);
                      } else {
                        setDays(days.filter((item) => item !== 6));
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckSaturday"
                  >
                    Saturday
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p className="mb-1">Select Shift avalaible</p>
              <div className="d-flex">
                <div className="form-group form-check mr-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckMorning"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setTime([...time, 8, 9, 10, 11, 12]);
                      } else {
                        setTime(
                          time.filter(
                            (item) =>
                              item !== 8 &&
                              item !== 9 &&
                              item !== 10 &&
                              item !== 11 &&
                              item !== 12
                          )
                        );
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckMorning"
                  >
                    Morning (8am - 12pm)
                  </label>
                </div>
                <div className="form-group form-check mx-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckAfternoon"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setTime([...time, 13, 14, 15, 16]);
                      } else {
                        setTime(
                          time.filter(
                            (item) =>
                              item !== 13 &&
                              item !== 14 &&
                              item !== 15 &&
                              item !== 16
                          )
                        );
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckAfternoon"
                  >
                    Afternoon (12pm - 4pm)
                  </label>
                </div>
                <div className="form-group form-check mx-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nutriCheckEvening"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setTime([...time, 17, 18, 19, 20, 21]);
                      } else {
                        setTime(
                          time.filter(
                            (item) =>
                              item !== 17 &&
                              item !== 18 &&
                              item !== 19 &&
                              item !== 20 &&
                              item !== 21
                          )
                        );
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckEvening"
                  >
                    Evening (4pm - 9pm)
                  </label>
                </div>
                <div className="form-group form-check mx-3"></div>
              </div>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                id="nutritionistFormControlTextarea1"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group d-flex flex-column my-2">
              {picInput == false ? (
                <button type="submit" className="btn btn-primary">
                  <a
                    href="https://postimages.org/"
                    target="_blank"
                    style={{ color: "white" }}
                    onClick={() => setPicInput(true)}
                  >
                    {" "}
                    Click here to convert your photo to a URL
                  </a>
                </button>
              ) : (
                <div className="form-group mb-2">
                  <label htmlFor="exampleInputEmail1">
                    Paste the direct link:
                  </label>
                  <div className="d-flex m-0">
                    <input
                      type="text"
                      className="form-control text-dark bg-opacity-10 shadow-lg p-3 mb-3 bg-body rounded"
                      id="clientInputFirstName"
                      placeholder="Something like this:    https://i.postimg.cc/c1pL93zQ/your_file_name.jpg"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      style={{ height: "55px" }}
                      onClick={() => setPicInput(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
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
