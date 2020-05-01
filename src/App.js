import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import MenuBar from "./components/MenuBar";
import DisplayPage from "./components/DisplayPage";

class App extends Component {
  state = {
    user: "Niels",
  };

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <MenuBar user={user} />
        <DisplayPage />
      </div>
    );
  }
}
export default App;
