import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Appointments = () => {
  const history = useHistory();
  const currentUser = () => {
    const user = localStorage.getItem('user');
    return (user);
  };

  const handleSignOut = e => {
    e.preventDefault();
    axios({
      method: 'DELETE',
      url: 'https://frozen-harbor-46293.herokuapp.com/auth/sign_out',
      data: JSON.parse(localStorage.user),
    })
      .then(() => {
        localStorage.removeItem('user');
        history.push('/login');
      });
  };
  return (
    <>
      <h2>Appointments go here!</h2>
      {currentUser() ? (
        <Button className="mt-4" variant="danger" onClick={handleSignOut}>Logout</Button>
      ) : (<></>)}
    </>
  );
};

export default Appointments;
