import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Nutritionistprofile } from "../component/nutritionistprofile";
import { Clientprofile } from "../component/clientprofile";
import "../../styles/home.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  console.log(store.rol);

  return (
    <div className="text-center container">
      {store.rol === "true" ? <Nutritionistprofile /> : <Clientprofile />}
    </div>
  );
};
