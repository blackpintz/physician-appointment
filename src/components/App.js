import React, { useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Login from './Login';

const App = () => {
  useEffect(async () => {
    const result = await axios.get('https://frozen-harbor-46293.herokuapp.com');
    const { data } = result;
    console.log(data);
  }, []);
  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default App;
