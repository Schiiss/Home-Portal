import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/landing/Header";
import Footer from "./Components/landing/Footer";
import About from "./Components/landing/About";
import Resume from "./Components/landing/Resume";
import Portfolio from "./Components/landing/Portfolio";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      landingData: {},
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getLandingData() {
    $.ajax({
      url: "/landingData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ landingData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });
  }

  componentDidMount() {
    this.getLandingData();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header data={this.state.landingData.main} />
          <About data={this.state.landingData.main} />
          <Resume data={this.state.landingData.resume} />
          <Portfolio data={this.state.landingData.portfolio} />
          <Footer data={this.state.landingData.main} />
        </div>
      </Router>
    );
  }
}

export default App;
