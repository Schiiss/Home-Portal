import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import React, { Component } from "react";

//Import Components
import Landing from "./components/layout/Landing";
import About from "./components/layout/About";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <>
            <Landing />
            <About />
          </>
        </div>
      </Router>
    );
  }
}

export default App;
