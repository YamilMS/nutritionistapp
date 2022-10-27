import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import { Context } from "../store/appContext";

export const Sessions = () => {
  const { store, actions } = useContext(Context);
  const [startDate, setStartDate] = useState(null);
  const [nutriId, setNutriId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [nutritionists, setNutritionists] = useState([]);
  const [cutTime, setCutTime] = useState([]);
  const navigate = useNavigate();
  const api = process.env.BACKEND_URL + "/api/nutritionist";

  if (store.rol === "true") navigate("/");

  useEffect(() => {
    getNutritionists();
  }, []);

  const handleSession = () => {
    if ((startDate != null, startTime != null)) {
      fetch(process.env.BACKEND_URL + "/api/session", {
        method: "POST",
        body: JSON.stringify({
          id_client: store.id,
          id_nutritionist: nutriId,
          date: startDate,
          time: startTime,
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
  };

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
        const timesAvailable = singleNutri.times.split(",");
        const minTimeAvailable = Math.min(...timesAvailable);
        const maxTimeAvailable = Math.max(...timesAvailable);

        {
          /**
           * This map renders the nutritionists data into cards
           */
        }

        const cutTimeFunction = () => {
          if (
            timesAvailable.includes("8") &&
            !timesAvailable.includes("13") &&
            timesAvailable.includes("20")
          ) {
            return setCutTime([
              setHours(setMinutes(new Date(), 0), 13),
              setHours(setMinutes(new Date(), 0), 14),
              setHours(setMinutes(new Date(), 0), 15),
              setHours(setMinutes(new Date(), 0), 16),
            ]);
          } else {
            return setCutTime([]);
          }
        };

        const isAvailable = (date) => {
          const day = date.getDay(date);
          const daysAvailableInNumber = daysAvailable.map(Number);
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
                            filterDate={isAvailable}
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
                            timeIntervals={60}
                            minTime={setHours(
                              setMinutes(new Date(), 0),
                              minTimeAvailable
                            )}
                            maxTime={setHours(
                              setMinutes(new Date(), 0),
                              maxTimeAvailable
                            )}
                            excludeTimes={cutTime}
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
                            onClick={handleSession}
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
                    onClick={() => {
                      setNutriId(singleNutri.id);
                      cutTimeFunction();
                    }}
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
