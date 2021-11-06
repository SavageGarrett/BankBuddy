import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Kid from "./components/Kid";
import Parent from "./components/Parent";

function App() {
  /* True if Kid, False if Parent */
  const [kid, setKid] = useState(true);

  return (
    <div className="App">
      <p>Select who You Are:</p>
      <button onClick={() => setKid(false)}>Parent</button>
      <button onClick={() => setKid(true)}>Kid</button>
      {kid ? <Kid /> : <Parent />}
    </div>
  );
}

export default App;
