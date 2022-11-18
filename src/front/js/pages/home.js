import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Apples from "../../img/Cuvelier-Fruit-header1-3.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url(" + Apples + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        objectFit: "cover",
        height: "100%",
      }}
    >
      <div className="text-center container">
        <div id="jumb" className="jumbotron">
          <h1 className="display-4">NUTRITIONIST APP </h1>
          <p>"An Apple a day keeps your doctor away"</p>
        </div>
      </div>
    </div>
  );
};
