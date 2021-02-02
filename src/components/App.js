import React, { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Login from './Login';

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
    <div>
      <Login />
    </div>
  );
};

export default App;
