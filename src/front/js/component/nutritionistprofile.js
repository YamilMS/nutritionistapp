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
  const [description, setDescription] = useState("");
  const [nutri, setNutri] = useState([]);
  const [edit, setEdit] = useState(false);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const apiURL = process.env.BACKEND_URL + "/api/nutritionist/" + store.id;

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
      setNutri(data.test);
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
        <h2>PROFILE</h2>
      </div>
      {edit === true ? (
        <div>
          <div>
            <div className="my-5">
              <div id="portraitProfilePicture" className="mx-auto w-50 py-4">
                <img
                  id="profilePic"
                  src="//www.html.am/images/image-codes/milford_sound_t.jpg"
                  width="225"
                  height="151"
                  alt="Photo of Milford Sound in New Zealand"
                />
              </div>
            </div>
            <div class="row g-3 my-2 justify-content-center align-items-center">
              <div class="col-2">
                <label for="inputFirstName" class="col-form-label">
                  First Name
                </label>
              </div>
              <div class="col-4">
                <input
                  type="text"
                  id="inputFirstName"
                  class="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  aria-describedby="firstNameHelpInline"
                />
              </div>
            </div>
            <div class="row g-3 my-2 justify-content-center align-items-center">
              <div class="col-2">
                <label for="inputLastName" class="col-form-label">
                  Last Name
                </label>
              </div>
              <div class="col-4">
                <input
                  type="text"
                  id="inputLastName"
                  class="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  aria-describedby="lastNameHelpInline"
                />
              </div>
            </div>
            <div class="row g-3 my-2 justify-content-center align-items-center">
              <div class="col-2">
                <label for="inputEmail" class="col-form-label">
                  Email
                </label>
              </div>
              <div class="col-4">
                <input
                  type="text"
                  id="inputEmail"
                  class="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailHelpInline"
                />
              </div>
            </div>
            <div class="row g-3 my-2 justify-content-center align-items-center">
              <div class="col-2">
                <label for="inputPassword" class="col-form-label">
                  Password
                </label>
              </div>
              <div class="col-4">
                <input
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="passwordHelpInline"
                />
                <span id="passwordHelpInline" class="form-text">
                  Must be 8-20 characters long.
                </span>
              </div>
              <div class="row g-3 my-2 justify-content-center align-items-center">
                <div class="col-2">
                  <label for="inputdescription" class="col-form-label">
                    Description
                  </label>
                </div>
                <div class="col-4">
                  <input
                    type="text"
                    id="inputDescription"
                    class="form-control"
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
              <button className="m-2" onClick={modifyNutriProfile}>
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {nutri.map((singleNutri) => {
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
                <div class="row g-3 my-2 justify-content-center align-items-center">
                  <div class="col-2">
                    <label for="inputFirstName" class="col-form-label">
                      First Name
                    </label>
                  </div>
                  <div class="col-4">
                    <input
                      type="text"
                      id="inputFirstName"
                      class="form-control"
                      value={singleNutri.first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      aria-describedby="firstNameHelpInline"
                    />
                  </div>
                </div>
                <div class="row g-3 my-2 justify-content-center align-items-center">
                  <div class="col-2">
                    <label for="inputLastName" class="col-form-label">
                      Last Name
                    </label>
                  </div>
                  <div class="col-4">
                    <input
                      type="text"
                      id="inputLastName"
                      class="form-control"
                      value={singleNutri.last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      aria-describedby="lastNameHelpInline"
                    />
                  </div>
                </div>
                <div class="row g-3 my-2 justify-content-center align-items-center">
                  <div class="col-2">
                    <label for="inputEmail" class="col-form-label">
                      Email
                    </label>
                  </div>
                  <div class="col-4">
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      value={singleNutri.nutritionist_email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="emailHelpInline"
                    />
                  </div>
                </div>
                <div class="row g-3 my-2 justify-content-center align-items-center">
                  <div class="col-2">
                    <label for="inputPassword" class="col-form-label">
                      Password
                    </label>
                  </div>
                  <div class="col-4">
                    <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      value={singleNutri.password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-describedby="passwordHelpInline"
                    />
                    <span id="passwordHelpInline" class="form-text">
                      Must be 8-20 characters long.
                    </span>
                  </div>
                  <div class="row g-3 my-2 justify-content-center align-items-center">
                    <div class="col-2">
                      <label for="inputdescription" class="col-form-label">
                        Description
                      </label>
                    </div>
                    <div class="col-4">
                      <input
                        type="text"
                        id="inputDescription"
                        class="form-control"
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
