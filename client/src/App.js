import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

//Bring in layout files
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddMovies from "./components/add-interests/AddMovies";
import AddBooks from "./components/add-interests/AddBooks";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

//Bring in auth layout files
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { clearCurrentProfile } from "./actions/profileActions";

import "./App.css";
import NotFound from "./components/not-found/NotFound";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info/exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-movies" component={AddMovies} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-books" component={AddBooks} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profiles" component={Profiles} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/:handle"
                  component={Profile}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
