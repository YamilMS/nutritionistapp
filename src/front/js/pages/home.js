import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Apples from "../../img/Cuvelier-Fruit-header1-3.png"

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div  className="container-fluid"  style={{backgroundImage: "url("+ Apples +")", backgroundRepeat: "no-repeat", backgroundPosition: "center"}} >
     <div  className="text-center container">
      <div id="jumb"  className="jumbotron">
        <h1 className="display-4">NUTRITIONIST APP </h1>
        <p>
          "An Apple a day keeps your doctor away"
        </p>
        <div className="d-flex justify-content-center align-items-end">
          <hr className="my-4"></hr>
            <div className="my-4">
              <Link to="/sessions">
                <button type="button" className="btn btn-primary m-3">
                  Sessions
                </button>
              </Link>
              <Link to="/clientprofile">
                <button type="button" className="btn btn-primary m-3">
                  Client Profile
                </button>
              </Link>
              <Link to="/nutriprofile">
                <button type="button" className="btn btn-primary m-3">
                  Nutritionist Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
