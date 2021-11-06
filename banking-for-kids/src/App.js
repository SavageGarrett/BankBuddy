import React, {useState, componentDidUpdate} from "react";
import logo from './logo.svg';
import './App.css';
import Kid from './components/Kid'
import Parent from './components/Parent'

function App() {
  /* True if Kid, False if Parent */
  const [kid, setKid] = useState();

  let currentUser;

  componentDidUpdate()
  {
    if (kid)
    {
      currentUser = <Kid></Kid>
      console.log("I am a kid")
    }
    else
    {
      currentUser = <Parent></Parent>
      console.log("I am a parent")
    }
  }

  return (
    <div className="App">
      <p>Select who You Are:</p>
      <button onClick={() => setKid(false)}>Parent</button>
      <button onClick={() => setKid(true)}>Kid</button>

      {currentUser}
    </div>
  );
}

export default App;
