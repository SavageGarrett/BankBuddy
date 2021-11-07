import React, { useState, useEffect } from "react";
import "./App.css";
import Kid from "./components/Kid";
import Parent from "./components/Parent";
import { ThemeProvider } from "@material-ui/core/styles";
import { Toolbar, AppBar, Button, Grid } from "@material-ui/core";
import theme from "./theme";

var axios = require("axios");

function App() {
  /* True if Kid, False if Parent */
  const [kid, setKid] = useState(true);
  const [tasks, setTasks] = useState(Array(Array(5)));

  useEffect(() => {
    var data = JSON.stringify({
      user_id: 2,
    });
    var config = {
      method: "GET",
      url: "https://c7j9xga7y9.execute-api.us-east-1.amazonaws.com/default/gettersetter",
      headers: {
        "x-api-key": "hkW0Vha0KA8GH60qfJmv88h8EAJx8VNp5Fgpem2G",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  const getTasksFromDB = () => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});

      var config = {
        method: "PATCH",
        url: "https://1u6xfou096.execute-api.us-east-1.amazonaws.com/default/gettersetter_tasks",
        headers: {
          "x-api-key": "r1rC7mLDKb1Bxc5neUsNt7JtxbSYF9ti3yYUMjkE",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  useEffect(() => {
    getTasksFromDB()
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(tasks);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Grid container>
              <Grid item xs={6}>
                <Button color="inherit" onClick={() => setKid(true)}>
                  Kid Account
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={() => setKid(false)}>Parent Portal</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {kid ? <Kid /> : <Parent />}
      </div>
    </ThemeProvider>
  );
}

export default App;
