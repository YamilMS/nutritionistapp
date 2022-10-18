import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  console.log(store.id, store.rol);

  return (
    <div className="text-center container">
      <div id="jumb" className="jumbotron">
        <h1 className="display-4">I'm the Jumbo's Homepage</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className="d-flex justify-content-center align-items-end">
          <hr className="my-4"></hr>
          <a
            href="#"
            className="btn btn-success btn-lg active m-2"
            role="button"
            aria-pressed="true"
          >
            Nutritionist
          </a>
          <a
            href="#"
            className="btn btn-danger btn-lg active m-2"
            role="button"
            aria-pressed="true"
          >
            Patient
          </a>
        </div>
      </div>
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
  );
};
