import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Nutritionistprofile } from "../component/nutritionistprofile";
import { Clientprofile } from "../component/clientprofile";
import "../../styles/home.css";
import imgProfile from "../../img/Cuvelier-Fruit-header1-3.png"

export const Profile = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid" style={{backgroundImage: "url("+ imgProfile +")", backgroundRepeat: "no-repeat", backgroundPosition: "center", padding: "1.5rem", backgroundSize: "100% 100%",}}>
      {store.id ? (
        <div className="text-center container">
          {store.rol === "true" ? <Nutritionistprofile /> : <Clientprofile />}
        </div>
      ) : (
        <div className="text-center container">
          <h5> Loading Profile </h5>
          <div className="d-flex justify-content-center">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
};
