import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
const api = process.env.BACKEND_URL + "/api/session";

export const Mysessions = () => {
  const { store, actions } = useContext(Context);
  const [sessions, setSessions] = useState([]);
  const [name, setName] = useState([]);

  useEffect(() => {
    const getSessions = async () => {
      try {
        // fetching data from the backend
        const response = await fetch(api, {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        });
        const data = await response.json();
        const sessionFromBackend = data.response_body;
        const nameFromBackend = data.name;
        console.log(data);
        setSessions(sessionFromBackend.get_body_session);
        setName(nameFromBackend);
        // don't forget to return something, that is how the async resolves
        return data;
      } catch (error) {
        console.log("Error loading message from backend", error);
      }
    };

    if (store.token) {
      getSessions();
    }
  }, [store.token]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      {sessions.map((singleSess, i) => {
        const date = singleSess.date;
        const time = singleSess.time;
        const dateArr = date.split("T");
        const timeArr = time.split("T");
        const timeSplited = timeArr[1].split(":");
        return (
          <tbody key={i}>
            {store.rol === "true" ? (
              <tr key={i}>
                <td>{singleSess.name_client}</td>
                <td>{dateArr[0]}</td>
                <td>{timeSplited[0].concat(":", timeSplited[1])}</td>
              </tr>
            ) : (
              <tr key={i}>
                <td>{singleSess.name_nutritionist}</td>
                <td>{dateArr[0]}</td>
                <td>{timeSplited[0].concat(":", timeSplited[1])}</td>
              </tr>
            )}
          </tbody>
        );
      })}
    </table>
  );
};
