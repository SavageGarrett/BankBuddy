import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Kid from "./components/Kid";
import Parent from "./components/Parent";
import { Nav } from "react-bootstrap";
import { ThemeProvider } from "@material-ui/core/styles";
import { Toolbar, AppBar, Button, Grid } from "@material-ui/core";
import theme from "./theme";

function App() {
  /* True if Kid, False if Parent */
  const [kid, setKid] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Grid container>
              <Grid item xs={6}>
                <Button onClick={() => setKid(false)}>Parent Portal</Button>
              </Grid>
              <Grid item xs={6}>
                <Button color="inherit" onClick={() => setKid(true)}>
                  Kid Account
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {kid ? <Kid/> : <Parent />}
      </div>
    </ThemeProvider>
  );
}

export default App;
