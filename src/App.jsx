import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import State from "./pages/StateData";

class App extends React.Component {

  render() {
    return (
      <BrowserRouter >
        <Route exact path="/" component={Home} />
        <Route exact path="/:state" component={State} />
      </BrowserRouter >
    );
  }
}

export default App;
