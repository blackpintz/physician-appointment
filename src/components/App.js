import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Login from './Login';
import Appointments from './Appointments';

const App = () => {
  const currentUser = () => {
    const user = localStorage.getItem('user');
    return (user);
  };
  return (
    <Switch>
      <Route exact path="/">
        {currentUser() ? <Appointments /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login" render={routeProps => (currentUser() ? <Redirect to="/" /> : <Login routeProps={routeProps} />)} />
    </Switch>
  );
};

export default App;
