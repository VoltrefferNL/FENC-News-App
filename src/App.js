import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import MenuBar from "./components/MenuBar";
import DisplayPage from "./components/DisplayPage";
import Homepage from "./components/Homepage";
import ErrorMessage from "./components/messages/ErrorMessage";

class App extends Component {
  state = {
    userLoggedIn: "cooljmessy",
  };

  render() {
    const { userLoggedIn } = this.state;

    return (
      <div className="App">
        <MenuBar user={userLoggedIn} />
        <Router className="main-router">
          <Homepage path="/" />
          <DisplayPage user={userLoggedIn} path="/articles/*" />
          <DisplayPage user={userLoggedIn} path="/topic/:topic/*" />
          <ErrorMessage default />
        </Router>
      </div>
    );
  }
}
export default App;
