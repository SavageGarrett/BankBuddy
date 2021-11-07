import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Stocks from './components/Stocks'

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Stocks></Stocks> */}
  </React.StrictMode>,
  document.getElementById('root')
);
