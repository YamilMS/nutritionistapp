import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Nutritionistprofile = () => {
  const { store, actions } = useContext(Context);

  return (
    <div id="profileForm" className="mx-auto text-center">
      <div className="my-2">
        <h2>PROFILE</h2>
      </div>
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
              aria-describedby="descriptionHelpInline"
            />
          </div>
        </div>
      </div>
      <div>
        <button className="m-2">ADD</button>
        <button className="m-2">EDIT</button>
        <button className="m-2">DELETE</button>
      </div>
    </div>
  );
};
