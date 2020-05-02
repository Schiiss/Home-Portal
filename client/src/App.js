import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import React, { Component } from "react";

//Import Components
import Landing from "./components/layout/Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Landing} />
      </Router>
    );
  }
}

export default App;
