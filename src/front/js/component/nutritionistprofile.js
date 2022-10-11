import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Nutritionistprofile = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <h1>HOLA SOY UN PERFIL</h1>
    </div>
  );
};
