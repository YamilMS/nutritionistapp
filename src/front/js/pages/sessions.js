import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Context } from "../store/appContext";

export const Sessions = () => {
	const [date, setDate] = useState(new Date());
	const handleChange = (date) => {
		setDate(date);
	  };
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
  ];

  return (
    <div className="container">
      {/**
       * This map renders the nutritionists data into cards
       */}
      {nutritionists.map((singleNutri, i) => {
        return (
          <div className="d-flex flex-row">
            <div className="card" style={{ width: "20rem" }}>
              <img
                className="card-img-top"
                src={singleNutri.image}
                alt="Card image cap"
              ></img>
              <div className="card-body">
                <h5 className="card-title">{singleNutri.name}</h5>
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Schedule a Session
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Schedule a Session with {singleNutri.name}
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          The available times are:
						  <br />
						  <br />
                          <div>
							
						</div>
						  <section className="container">
                            <form className="row">
                              <label
                                for="date"
                                className="col-2 col-form-label"
                              >
                                Date
                              </label>
							  <span className="input-group-append">
                                    <span className="input-group-text d-block">
									<DatePicker
										className="form-control form-control-sm"
										type="text"
										size="sm"
										placeholder=""
										selected={date}
										onChange={handleChange}
									/>
                                      <i className="fa fa-calendar"></i>
                                	</span>
								</span>		
                            </form>
                          </section>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
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
