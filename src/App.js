import React, { Component } from 'react';
import { auth } from './firebase/firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import { userAuthActions } from './store/actions/index'

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Buses from './components/Buses/index';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import AddCategory from './components/auth/AddCategory';
import 'typeface-roboto'
import './App.css';

import CreateCompany from './components/CreateCompany'
import CreateRoute from './components/CreateRoute'
import CreateRide from './components/CreateRide'
import Company from './components/Company'
import { BusSearch } from './components/bus-search/busSearch'

// Check for token



class App extends Component {

  componentDidMount() {

    // auth.onAuthStateChanged(function (user) {
    //   if (user) {
    //     const { email, uid, metadata } = user
    //     store.dispatch(userAuthActions.isLoggedInSuccess({email, uid, metadata}))
    //     // User is signed in.
    //   } else {
    //     store.dispatch(userAuthActions.isLoggedInFailure())
    //     // No user is signed in.
    //   }
    // });
  }


  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={BusSearch} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/@:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-company" component={CreateCompany} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-route" component={CreateRoute} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-ride" component={CreateRide} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/company/:cid" component={Company} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/company/:cid/buses" component={Buses} />
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
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-category"
                  component={AddCategory}
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
