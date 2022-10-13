import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Context } from "../store/appContext";

export const Sessions = () => {
  const [startDate, setStartDate] = useState(new Date());
  const api = process.env.BACKEND_URL+'api/nutritionist';

  const [nutritionists, setNutritionists] = useState([]);

  useEffect(() => {
    getNutritionists();
  }, []);

  function getNutritionists() {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setNutritionists(data.results);
      });
  }
  {
    /**
       * 
       
  const nutritionists = [
    {
      name: "Tomas",
      image:
        "https://www.theportlandclinic.com/wp-content/uploads/2019/07/Person-Curtis_4x5-e1564616444404-300x300.jpg",
      description:
        "Some quick example text to build on the card title and make up the bulk of the cards content.",
    },
    {
      name: "Mario",
      image:
        "https://dergreif-online.de/www/wp-content/uploads/2016/07/Timothy_hoch.jpg",
      description:
        "Some quick example text to build on the card title and make up the bulk of the cards content.",
    },
    {
      name: "Matias",
      image:
        "https://gobierno.cyborgcam.com/wp-content/uploads/2019/02/person4.jpg",
      description:
        "Some quick example text to build on the card title and make up the bulk of the cards content.",
    },
    {
      name: "Luis",
      image:
        "https://gobierno.cyborgcam.com/wp-content/uploads/2019/02/person6.jpg",
      description:
        "Some quick example text to build on the card title and make up the bulk of the cards content.",
    },
    {
      name: "Fernando",
      image:
        "https://images.unsplash.com/photo-1568316674077-d72ee56de61c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      description:
        "Some quick example text to build on the card title and make up the bulk of the cards content.",
    },
    {
      name: "María",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80",
      description:
        "Some quick example text to build on the card title and make up the bulk of the cards content.",
    },
  ];
  */
  }

  return (
    <div className="container">
      {/**
       * This map renders the nutritionists data into cards
       */}
      {nutritionists.map((singleNutri, i) => {
        return (
          <div className="d-inline-flex p-5">
            <div className="card m-2" style={{ width: "20rem" }}>
              {/**
       * This map renders the nutritionists data into cards
              <img
               className="card-img-top"
                src={singleNutri.image}
                alt="Card image cap"
                width="50" height="350"
              ></img>
              */}
              <div className="card-body">
                <h5 className="card-title">{singleNutri.name}</h5>
                <p className="card-text">{singleNutri.height}</p>
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Schedule a Session
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Schedule a Session with {singleNutri.name}
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          The available times are:
                          <br />
                          <br />
                          <div className="d-inline-flex p-2">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              showTimeSelect
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              timeCaption="time"
                              dateFormat="MMMM d, yyyy h:mm aa"
                            />
                            <i className="fa fa-calendar align-self-center m-2"></i>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
