import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Clientprofile = () => {
  const { store, actions } = useContext(Context);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [picInput, setPicInput] = useState(false);
  const [photo, setPhoto] = useState("");
  const [client, setClient] = useState([]);
  const [edit, setEdit] = useState("");
  const navigate = useNavigate();
  const apiURL = process.env.BACKEND_URL + "/api/client/" + "1";

  useEffect(() => {
    const getClientProfile = async () => {
      try {
        const response = await fetch(apiURL);
        if (response.status !== 200) {
          console.log("There has been an error on the response.status");
          return false;
        }
        const data = await response.json();
        console.log("data from the backend ", data);
        setClient(data.test);
        const arr = data.test;
        arr.map((item) => {
          setId(item.id);
          setFirstName(item.first_name);
          setLastName(item.last_name);
          setEmail(item.client_email);
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
      }
    };

    getClientProfile();
  }, []);

  const deleteClientProfile = async () => {
    try {
      const response = await fetch(apiURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.staus !== 200) {
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

  const editClientPorfile = async () => {
    try {
      const response = await fetch(apiURL, {
        method: "PUT",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          nutritionist_email: email,
          password: password,
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
        <h2>PROFILE</h2>
      </div>
      {edit === true ? (
        <div>
          <div>
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
                  editClientPorfile();
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
          <div key={id}>
            <div className="my-5">
              <div id="portraitProfilePicture" className="mx-auto w-50 py-4">
                <img
                  id="profilePic"
                  src={photo}
                  width="225"
                  height="151"
                  alt="Profile Picture"
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
                className="m-2"
                onClick={() => {
                  setEdit(true);
                }}
              >
                EDIT
              </button>
              <button className="m-2" onClick={deleteClientProfile}>
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
