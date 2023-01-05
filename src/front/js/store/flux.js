const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      rol: null,
      id: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },

    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      login: async (email, password) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          if (response.status !== 200) {
            alert("There has been an error on the response.status");
            return false;
          }
          const data = await response.json();
          console.log("data from the backend ", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({
            token: data.access_token,
            id: data.id,
            rol: data.professional,
          });
          return true;
        } catch (error) {
          alert("There has been an error login in ");
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null, id: null, rol: null });
      },

      getTokenFromSession: async () => {
        const store = getStore();
        const token = sessionStorage.getItem("token");
        if (token !== "" && token !== undefined && token !== null) {
          setStore({ token: token });
          try {
            // fetching data from the backend
            const response = await fetch(
              process.env.BACKEND_URL + "/api/token",
              {
                headers: {
                  Authorization: "Bearer " + store.token,
                },
              }
            );
            const data = await response.json();
            console.log(data);
            setStore({ id: data.id, rol: data.professional });
            // don't forget to return something, that is how the async resolves
            return data;
          } catch (error) {
            console.log("Error loading message from backend", error);
          }
        }
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
