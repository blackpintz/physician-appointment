import React, { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../App.css';
import Login from './Login';

const App = () => {
  const currentUser = () => {
    const user = localStorage.getItem('user');
    return (user);
  };

  console.log(currentUser());
  const handleSignOut = e => {
    e.preventDefault();
    axios({
      method: 'DELETE',
      url: 'https://frozen-harbor-46293.herokuapp.com/auth/sign_out',
      data: JSON.parse(localStorage.user),
    })
      .then(() => {
        localStorage.removeItem('user');
        window.location = '/';
      });
  };

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
      {currentUser() ? (
        <Button className="mt-4" variant="danger" onClick={handleSignOut}>Logout</Button>
      ) : (<></>)}
    </div>
  );
};

export default App;
