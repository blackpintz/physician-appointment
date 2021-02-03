import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Login from './Login';
import AppointmentList from './AppointmentList';
import Home from './Home';
import Physician from './Physician';
import currentUser from '../helpers/currentUser';
import Signup from './Signup';

const App = () => (
  <Switch>
    <Route exact path="/">
      {currentUser() ? <Home /> : <Redirect to="/login" />}
    </Route>
    <Route exact path="/signup" render={routeProps => (currentUser() ? <Redirect to="/" /> : <Signup routeProps={routeProps} />)} />
    <Route exact path="/login" render={routeProps => (currentUser() ? <Redirect to="/" /> : <Login routeProps={routeProps} />)} />
    <Route exact path="/appointments">
      {currentUser() ? <AppointmentList /> : <Redirect to="/login" />}
    </Route>
    <Route exact path="/physician/:id" render={routeProps => (!currentUser() ? <Redirect to="/" /> : <Physician id={routeProps.match.params.id} routeProps={routeProps} />)} />
  </Switch>
);

export default App;
