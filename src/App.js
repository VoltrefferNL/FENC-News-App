import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import MenuBar from "./components/MenuBar";
import DisplayPage from "./components/DisplayPage";
import Homepage from "./components/Homepage";

class App extends Component {
  constructor(props) {
    super(props);
    this.setTopic = this.setTopic.bind(this);
    this.state = {
      user: "Niels",
      setTopic: "",
    };
  }
  setTopic(setTopic) {
    this.setState({ setTopic });
  }

  render() {
    const { user, setTopic } = this.state;

    return (
      <div className="App">
        {console.log(this.state, "====== This is in app")}
        <MenuBar user={user} filterTopic={this.setTopic} />
        <Router className="main-router">
          <Homepage path="/" />
          <DisplayPage path="/articles/*" topic={setTopic} />
        </Router>
      </div>
    );
  }
}
export default App;
