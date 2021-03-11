import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Welcome from './Welcome/welcome';
import Case1 from './Case1/case1';
import Case2 from './Case2/case2';
import Case3 from './Case3/case3';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" component={Welcome} />
        <Route path="/case1" component={Case1} />
        <Route path="/case2" component={Case2} />
        <Route path="/case3" component={Case3} />
      </header>
    </div>
  );
}

export default App;
