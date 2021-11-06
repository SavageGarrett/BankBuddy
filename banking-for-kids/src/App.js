import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Kid from "./components/Kid";
import Parent from "./components/Parent";
import {Nav} from 'react-bootstrap'

function App() {
  /* True if Kid, False if Parent */
  const [kid, setKid] = useState(true);

  return (
    <div className="App">
      <Nav>
        <Nav.Item>
          <Nav.Link onClick={() => setKid(false)}>Parent</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setKid(true)}>Kid</Nav.Link>
        </Nav.Item>
      </Nav>

      <p>Select who You Are:</p>
      {kid ? <Kid /> : <Parent />}
    </div>
  );
}

export default App;
