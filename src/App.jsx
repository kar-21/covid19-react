import React from "react";
import "./App.css";

import Home from "./pages/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>COVID-19 Tracker</h1>
        <Home />
      </>
    );
  }
}

export default App;
