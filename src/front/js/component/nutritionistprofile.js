import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Nutritionistprofile = () => {
  const { store, actions } = useContext(Context);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [days, setDays] = useState([]);
  const [time, setTime] = useState([]);
  const [description, setDescription] = useState("");
  const [picInput, setPicInput] = useState(false);
  const [photo, setPhoto] = useState("");
  const [nutri, setNutri] = useState([]);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const apiURL = process.env.BACKEND_URL + "/api/nutritionist/" + store.id;

  const dayMap = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  useEffect(() => {
    const getNutriProfile = async () => {
      try {
        const response = await fetch(apiURL);
        if (response.status !== 200) {
          console.log("There has been an error on the response.status");
          return false;
        }
        const data = await response.json();
        console.log("data from the backend ", data);
        const nutriData = data.test;
        setNutri(data.test);
        nutriData.map((item) => {
          setEdit(item.id);
          setFirstName(item.first_name);
          setLastName(item.last_name);
          setEmail(item.nutritionist_email);
          setPassword(item.password);
          setDescription(item.description);
          setPhoto(item.photo);
        });
        return true;
      } catch (error) {
        console.error(
          "There has been an error getting the information through fetch ",
          error
        );
        alert("Profile doesn't exist you'll be redirected to Home");
        navigate("/");
      }
    };

    getNutriProfile();
  }, []);

  const deleteNutri = async () => {
    try {
      const response = await fetch(apiURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        alert("There has been an error on the response.status");
        return false;
      }
      const data = await response.json();
      return true;
    } catch (error) {
      console.error("There has been an error login in ", error);
    }
  };

  const modifyNutriProfile = async () => {
    try {
      const response = await fetch(apiURL, {
        method: "PUT",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          nutritionist_email: email,
          password: password,
          professional: true,
          days: days.join(""),
          times: time.join(","),
          description: description,
          photo: photo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        alert("There has been an error on the response.status");
        return false;
      }
      const data = await response.json();
      console.log("data from the backend ", data);
      return true;
    } catch (error) {
      console.error("There has been an error editing profile ", error);
    }
  };

  return (
    <div id="profileForm" className="mx-auto text-center">
      <div className="my-2">
        <h2>NUTRI PROFILE</h2>
      </div>
      {edit === true ? (
        <div>
          <div key={`${id}Edit`}>
            {picInput == false ? (
              <a
                href="https://postimages.org/"
                target="_blank"
                style={{ color: "white" }}
                onClick={() => setPicInput(true)}
              >
                <button
                  type="submit"
                  className="outButton btn btn-outline-primary m-2"
                >
                  {" "}
                  Click here to convert your photo to a URL
                </button>
              </a>
            ) : (
              <div className="row g-3 my-2 justify-content-center align-items-center">
                <div className="col-2">
                  <label htmlFor="exampleInputEmail1">Direct link:</label>
                </div>
                <div className="col-4 d-flex">
                  <input
                    type="text"
                    className="form-control"
                    id="clientInputFirstName"
                    placeholder="Something like this:    https://i.postimg.cc/c1pL93zQ/your_file_name.jpg"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger mx-2"
                    onClick={() => setPicInput(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="row g-3 my-2 justify-content-center align-items-center">
              <div className="col-2">
                <label htmlFor="inputFirstName" className="col-form-label">
                  First Name
                </label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="inputFirstName"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  aria-describedby="firstNameHelpInline"
                />
              </div>
            </div>
            <div className="row g-3 my-2 justify-content-center align-items-center">
              <div className="col-2">
                <label htmlFor="inputLastName" className="col-form-label">
                  Last Name
                </label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="inputLastName"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  aria-describedby="lastNameHelpInline"
                />
              </div>
            </div>
            <div className="row g-3 my-2 justify-content-center align-items-center">
              <div className="col-2">
                <label htmlFor="inputEmail" className="col-form-label">
                  Email
                </label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="inputEmail"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailHelpInline"
                />
              </div>
            </div>
            <div className="row g-3 my-2 justify-content-center align-items-center">
              <div className="col-2">
                <label htmlFor="inputPassword" className="col-form-label">
                  Password
                </label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="inputPassword"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="passwordHelpInline"
                />
                <span id="passwordHelpInline" className="form-text">
                  Must be 8-20 characters long.
                </span>
              </div>
              <div className="row g-3 my-2 justify-content-center align-items-center">
                <p className="mb-1">Select your new Times avalaible</p>
                <div className="col-6 d-flex justify-content-center">
                  <div className="form-group form-check mr-3">
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
              <div className="row g-3 my-2 justify-content-center align-items-center">
                <p className="mb-1">Select Shift avalaible</p>
                <div className="col-6 d-flex justify-content-center">
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
                </div>
              </div>
              <div className="row g-3 my-2 justify-content-center align-items-center">
                <div className="col-2">
                  <label htmlFor="inputdescription" className="col-form-label">
                    Description
                  </label>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    id="inputDescription"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    aria-describedby="descriptionHelpInline"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                className="outButton btn btn-outline-primary m-2"
                onClick={() => {
                  setEdit(false);
                }}
              >
                GO BACK
              </button>
              <button
                className="schedulebutton btn btn-primary m-2"
                onClick={() => {
                  modifyNutriProfile();
                  setEdit(false);
                }}
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {nutri.map((singleNutri) => {
            const getDays = singleNutri.days
              .split("")
              .map((day) => dayMap[parseInt(day)]);

            return (
              <div key={singleNutri.id}>
                <div className="my-5">
                  <div
                    id="portraitProfilePicture"
                    className="mx-auto w-50 py-4"
                  >
                    <img
                      id="profilePic"
                      className="userphoto"
                      src={photo}
                      alt="Profile picture"
                    />
                  </div>
                </div>
                <div className="row g-3 my-2 justify-content-center align-items-center">
                  <div className="col-2">
                    <label htmlFor="inputFirstName" className="col-form-label">
                      First Name
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      id="inputFirstName"
                      className="form-control-plaintext"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      aria-describedby="firstNameHelpInline"
                    />
                  </div>
                </div>
                <div className="row g-3 my-2 justify-content-center align-items-center">
                  <div className="col-2">
                    <label htmlFor="inputLastName" className="col-form-label">
                      Last Name
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      id="inputLastName"
                      className="form-control-plaintext"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      aria-describedby="lastNameHelpInline"
                    />
                  </div>
                </div>
                <div className="row g-3 my-2 justify-content-center align-items-center">
                  <div className="col-2">
                    <label htmlFor="inputEmailEdit" className="col-form-label">
                      Email
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      id="inputEmailEdit"
                      className="form-control-plaintext"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="emailHelpInline"
                    />
                  </div>
                </div>
                <div className="row g-3 my-2 justify-content-center align-items-center">
                  <div className="col-2">
                    <label htmlFor="text" className="col-form-label">
                      Days avalaible
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      type="text"
                      id="inputEmail"
                      className="form-control-plaintext"
                      value={getDays.join(", ")}
                      onChange={(e) => setDays(e.target.value)}
                      aria-describedby="emailHelpInline"
                    />
                  </div>
                </div>
                <div className="row g-3 my-2 justify-content-center align-items-center">
                  {/* <div className="col-2">
                    <label htmlFor="inputPassword" className="col-form-label">
                      Password
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control-plaintext"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-describedby="passwordHelpInline"
                    />
                    <span id="passwordHelpInline" className="form-text">
                      Must be 8-20 characters long.
                    </span>
                  </div> */}
                  <div className="row g-3 my-2 justify-content-center align-items-center">
                    <div className="col-2">
                      <label
                        htmlFor="inputdescription"
                        className="col-form-label"
                      >
                        Description
                      </label>
                    </div>
                    <div className="col-4">
                      <input
                        type="text"
                        id="inputDescription"
                        className="form-control-plaintext"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        aria-describedby="descriptionHelpInline"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="outButton btn btn-outline-primary m-2"
                    onClick={deleteNutri}
                  >
                    DELETE
                  </button>
                  <button
                    className="schedulebutton btn btn-primary m-2"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    EDIT
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
