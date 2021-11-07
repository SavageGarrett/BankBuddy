import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Kid from "./components/Kid";
import Parent from "./components/Parent";
import { Nav } from "react-bootstrap";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

function App() {
  /* True if Kid, False if Parent */
  const [kid, setKid] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={() => setKid(false)}>Parent</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setKid(true)}>Kid</Nav.Link>
          </Nav.Item>
        </Nav>
        {kid ? <Kid /> : <Parent />}
      </div>
    </ThemeProvider>
  );
}

export default App;
