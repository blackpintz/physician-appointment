import React, { useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Login from './Login';
import Appointments from './Appointments';

const App = () => {
  useEffect(async () => {
    if (localStorage.user) {
      const result = await axios.get('https://frozen-harbor-46293.herokuapp.com/appointments', { headers: JSON.parse(localStorage.user) });
      const { data } = result;
      console.log(data);
    } else {
      console.log('Not logged in yet..');
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" render={routeProps => <Appointments routeProps={routeProps} />} />
      <Route exact path="/login" render={routeProps => <Login routeProps={routeProps} />} />
    </Switch>
  );
};

export default App;
