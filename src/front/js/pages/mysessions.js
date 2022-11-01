import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
const api = process.env.BACKEND_URL + "/api/session/";

export const Mysessions = () => {
  const { store, actions } = useContext(Context);
  const [sessions, setSessions] = useState([]);

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
        console.log(data);
        setSessions(sessionFromBackend.get_body_session);
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

  const handleDeleteSession = async (id) => {
    try {
      const response = await fetch(api + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.staus !== 200) {
        console.log("There has been an error on the response.status");
        return false;
      }
      const data = await response.json();
      console.log("data from the backend ", data);
      return true;
    } catch (error) {
      console.error("There has been an error login in ", error);
    }
  };

  return (
    <table className="table mx-3">
      <thead className="col-3 ">
        <tr>
          <th className="col-3" scope="col">
            Name
          </th>
          <th className="col-3" scope="col">
            Date
          </th>
          <th className="col-3" scope="col">
            Time
          </th>
          <th className="col-3" scope="col"></th>
        </tr>
      </thead>
      {sessions.map((singleSess, i) => {
        const date = singleSess.date;
        const time = singleSess.time;
        const dateArr = date.split("T");
        const timeArr = time.split("T");
        const timeSplited = timeArr[1].split(":");
        const id = singleSess.id;

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
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setSessions(sessions.filter((item) => item.id !== id));
                      handleDeleteSession(id);
                    }}
                  >
                    Delete session
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        );
      })}
    </table>
  );
};
