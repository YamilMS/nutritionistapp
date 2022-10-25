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
  const [description, setDescription] = useState("");
  const [nutri, setNutri] = useState([]);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const apiURL = process.env.BACKEND_URL + "/api/nutritionist/" + store.id;

  console.log(store.id);

  const dayMap = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  useEffect(() => {
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
      console.log("data from the backend ", data);
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
          description: description,
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setDescription("");
  };

  const getNutriProfile = async () => {
    try {
      const response = await fetch(apiURL);
      if (response.status !== 200) {
        alert("There has been an error on the response.status");
        return false;
      }
      const data = await response.json();
      console.log("data from the backend ", data);
      const arr = data.test;
      setNutri(data.test);
      arr.map((item) => {
        setFirstName(item.first_name);
        setLastName(item.last_name);
        setEmail(item.nutritionist_email);
        setPassword(item.password);
        setDescription(item.description);
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

  return (
    <div id="profileForm" className="mx-auto text-center">
      <div className="my-2">
        <h2>NUTRI PROFILE</h2>
      </div>
      {edit === true ? (
        <div>
          {nutri.map((singleNutri) => {
            console.log(firstName);
            return (
              <div key={`${singleNutri}Edit`}>
                <div className="my-5">
                  <div
                    id="portraitProfilePicture"
                    className="mx-auto w-50 py-4"
                  >
                    <img
                      id="profilePic"
                      src="//www.html.am/images/image-codes/milford_sound_t.jpg"
                      width="225"
                      height="151"
                      alt="Photo of Milford Sound in New Zealand"
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
                      type="password"
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
                    className="m-2"
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    GO BACK
                  </button>
                  <button
                    className="m-2"
                    onClick={() => {
                      modifyNutriProfile();
                      setEdit(false);
                    }}
                  >
                    SAVE CHANGES
                  </button>
                </div>
              </div>
            );
          })}
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
                      src="//www.html.am/images/image-codes/milford_sound_t.jpg"
                      width="225"
                      height="151"
                      alt="Photo of Milford Sound in New Zealand"
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
                      className="form-control"
                      value={singleNutri.first_name}
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
                      value={singleNutri.last_name}
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
                      className="form-control"
                      value={singleNutri.nutritionist_email}
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
                      className="form-control"
                      value={getDays.join(", ")}
                      onChange={(e) => setDays(e.target.value)}
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
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      value={singleNutri.password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-describedby="passwordHelpInline"
                    />
                    <span id="passwordHelpInline" className="form-text">
                      Must be 8-20 characters long.
                    </span>
                  </div>
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
                        className="form-control"
                        value={singleNutri.description}
                        onChange={(e) => setDescription(e.target.value)}
                        aria-describedby="descriptionHelpInline"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    className="m-2"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    EDIT
                  </button>
                  <button className="m-2" onClick={deleteNutri}>
                    DELETE
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
