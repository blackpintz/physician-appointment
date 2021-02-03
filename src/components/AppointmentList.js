import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import currentUser from '../helpers/currentUser';
import AppointmentItem from './AppointmentItem';

const AppointmentList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(async () => {
    if (localStorage.user) {
      const result = await axios.get('https://frozen-harbor-46293.herokuapp.com/appointments', { headers: JSON.parse(localStorage.user) });
      const { data } = result;
      setData(data);
    } else {
      <p>Not logged in yet..</p>;
    }
  }, []);

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
      {data.length === 0 ? (
        <>
          <h3>You do not have any appointments.</h3>
        </>
      ) : (
        <>
          {data.map(item => <AppointmentItem key={item.id} item={item} />)}
        </>
      )}
      {currentUser() ? (
        <Button className="mt-4" variant="danger" onClick={handleSignOut}>Logout</Button>
      ) : (<></>)}
    </>
  );
};

export default AppointmentList;
