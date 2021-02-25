import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Welcome from './Welcome/welcome';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={Welcome} />
      </header>
    </div>
  );
}

export default App;
