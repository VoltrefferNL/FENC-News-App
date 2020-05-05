import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import MenuBar from "./components/MenuBar";
import DisplayPage from "./components/DisplayPage";
import Homepage from "./components/Homepage";

class App extends Component {
  state = {
    user: "Niels",
    setTopic: "",
  };

  setTopic = (setTopic) => {
    this.setState({ setTopic });
  };

  render() {
    const { user, setTopic } = this.state;

    return (
      <div className="App">
        <MenuBar user={user} filterTopic={this.setTopic} />
        <Router className="main-router">
          <Homepage path="/" />
          <DisplayPage path="/articles/*" topic={setTopic} />
          <DisplayPage path="/topic/:topic" />
        </Router>
      </div>
    );
  }
}
export default App;
