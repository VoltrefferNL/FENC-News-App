import React, { Component } from "react";
import * as api from "../api";
import HomepageCard from "./cards/HomepageCard";
import LoadingMessage from "./messages/LoadingMessage";

class Homepage extends Component {
  state = { topics: [], isLoading: true };

  componentDidMount() {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }

  render() {
    const { isLoading, topics } = this.state;
    if (isLoading) return <LoadingMessage />;
    else
      return (
        <div className="homepage-container">
          {topics.map(({ slug }) => {
            return <HomepageCard key={slug} slug={slug} />;
          })}
        </div>
      );
  }
}
export default Homepage;
