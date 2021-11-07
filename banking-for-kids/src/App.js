import React, { useState, useEffect } from "react";
import "./App.css";
import Kid from "./components/Kid";
import Parent from "./components/Parent";
import { ThemeProvider } from "@material-ui/core/styles";
import { Toolbar, AppBar, Button, Grid } from "@material-ui/core";
import theme from "./theme";

var axios = require('axios')

function App() {
  /* True if Kid, False if Parent */
  const [kid, setKid] = useState(true);
  const [tasks, setTasks] = useState(Array({}))
  

  const getTasksFromDB = () => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
  
      var config = {
        method: 'PATCH',
        url: 'https://1u6xfou096.execute-api.us-east-1.amazonaws.com/default/gettersetter_tasks',
        headers: { 
          'x-api-key': 'r1rC7mLDKb1Bxc5neUsNt7JtxbSYF9ti3yYUMjkE',
          'Content-Type': 'application/json'
        },
        data : data
      };
  
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    })
  }

  useEffect(()=>{
    getTasksFromDB()
      .then(response => {
        let toArrOfObj = [];

        for (let i of response)
        {
          toArrOfObj.push({
            name: i[0],
            price: i[1],
            completed: i[2],
            infoLine: i[3],
            id: i[4]
          })
        }

        setTasks(toArrOfObj)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

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
        {kid ? <Kid /> : <Parent tasks={tasks} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
