import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ConnectLogin from './Login';
import ConnectAppointmentList from './AppointmentList';
import ConnectHome from './Home';
import ConnectPhysician from './Physician';
import currentUser from '../helpers/currentUser';
import ConnectSignup from './Signup';
import Menu from './Menu';

const App = () => (
  <>
    <Menu />
    <Switch>
      <Route exact path="/login" render={routeProps => (currentUser() ? <Redirect to="/" /> : <ConnectLogin routeProps={routeProps} />)} />
      <Route exact path="/">
        {currentUser() ? <ConnectHome /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/signup" render={routeProps => (currentUser() ? <Redirect to="/" /> : <ConnectSignup routeProps={routeProps} />)} />
      <Route exact path="/appointments">
        {currentUser() ? <ConnectAppointmentList /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/physician/:id" render={routeProps => (!currentUser() ? <Redirect to="/" /> : <ConnectPhysician physicianId={routeProps.match.params.id} routeProps={routeProps} />)} />
    </Switch>
  </>
);

export default App;
