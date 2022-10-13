import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Clientprofile = () => {
  const { store, actions } = useContext(Context);
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ description, setDescription ] = useState("")
  const token = sessionStorage.getItem("token");
  const  navigate = useNavigate()

  const addClientInformation = () => {
    actions.changeData(firstName, lastName, email, password, description);
  }


  return (
    <div className="text-center container">
			<div className="card">
            <img className="card-img-top" src="I'll be an image" alt="Profile Image Card"/>
                <div className="card-body">
                    <input className="form-control" type="text" value={firstName} aria-label="Disabled input example" disabled readonly/>
                    <input className="form-control" type="text" value={lastName} aria-label="Disabled input example" disabled readonly/>
                    <input className="form-control" type="text" value={email} aria-label="Disabled input example" disabled readonly/>
                    <input className="form-control" type="text" value={password} aria-label="Disabled input example" disabled readonly/>
                    <input className="form-control" type="text" value={description} aria-label="Disabled input example" disabled readonly/>
                    <button type="button" className="btn btn-success row gx-1" onClick={addClientInformation}>ADD</button>
                    <button type="button" className="btn btn-primary gx-1">Edit</button>
                    <button type="button" className="btn btn-danger gx-1">Delete</button>
                </div>
            </div>
		</div>
  );
};
