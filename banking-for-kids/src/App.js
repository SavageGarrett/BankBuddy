import React, {useState} from "react"
import logo from './logo.svg';
import './App.css';

function App() {
  /* True if Kid, False if Parent */
  const [kid, setKid] = useState();

  return (
    <div className="App">
      <p>Select who You Are:</p>
      <button onClick={() => setKid(false)}>Parent</button>
      <button onClick={() => setKid(true)}>Kid</button>

      <h1>{kid}</h1>
      
    </div>
  );
}

export default App;
