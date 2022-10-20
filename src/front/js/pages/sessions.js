import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Context } from "../store/appContext";

export const Sessions = () => {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(new Date());

  const api = process.env.BACKEND_URL + "/api/nutritionist";

  const [nutritionists, setNutritionists] = useState([]);

  useEffect(() => {
    getNutritionists();
  }, []);

  function getNutritionists() {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setNutritionists(data.get_body_nutri);
      });
  }

  return (
    <div className="container">
      {/**
       * This map renders the nutritionists data into cards
       */}
      {nutritionists.map((singleNutri, i) => {
        const daysAvailable = singleNutri.days.split("");
        [1, 3, 5];

        const isWeekday = (date) => {
          const day = date.getDay(date);
          const daysAvailableInNumber = daysAvailable.map(Number);
          console.log(daysAvailable);
          console.log(daysAvailableInNumber);
          return daysAvailableInNumber.includes(day);
        };

        return (
          <div className="d-inline-flex p-5" key={singleNutri.id}>
            <div className="card m-2" style={{ width: "20rem" }}>
              <img
                className="card-img-top"
                src="https://images.unsplash.com/photo-1568316674077-d72ee56de61c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                alt="Card image cap"
                width="50"
                height="350"
              ></img>
              <div className="card-body" id={singleNutri.id}>
                <h5 className="card-title">{singleNutri.first_name}</h5>
                <p className="card-text">{singleNutri.description}</p>
                <div className="d-flex flex-row">
                  {/**
						This Button must redirect the user to the nutritionist profile page
							*/}
                  <a href="#" className="btn btn-link m-2">
                    Learn More
                  </a>
                  {/**
					 This Button must open the modal to schedule a session
							*/}
                  <div
                    className="modal fade"
                    id={`exampleModalToggle${i}`}
                    aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel"
                    tabIndex="-1"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalToggleLabel"
                          >
                            Schedule a Session with {singleNutri.first_name}
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <br />
                          <p>Pick a Date:</p>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            filterDate={isWeekday}
                            dateFormat="MMMM d, yyyy"
                            isClearable
                            placeholderText="Pick a Date"
                          />
                          <br />
                          <br />
                          <p>Pick a Time:</p>
                          <DatePicker
                            selected={startTime}
                            onChange={(date) => setStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            isClearable
                            placeholderText="Pick a Time"
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            className="btn btn-primary"
                            data-bs-target={`#exampleModalToggle2${i}`}
                            data-bs-toggle="modal"
                          >
                            Schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id={`exampleModalToggle2${i}`}
                    aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel2"
                    tabIndex="-1"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalToggleLabel2"
                          >
                            You've done a step forward on being healthier
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Your session has been scheduled!
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    href={`#exampleModalToggle${i}`}
                    role="button"
                  >
                    Schedule a session
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <br />
      <br />
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
