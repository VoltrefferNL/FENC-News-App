import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import MenuBar from "./components/MenuBar";
import DisplayPage from "./components/DisplayPage";
import Homepage from "./components/Homepage";

class App extends Component {
  state = {
    user: "Niels",
  };

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <MenuBar user={user} />
        <Router className="main-router">
          <Homepage path="/" />
          <DisplayPage path="/articles/*" />
        </Router>
      </div>
    );
  }
}
export default App;
