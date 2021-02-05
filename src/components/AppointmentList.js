import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import AppointmentItem from './AppointmentItem';

const AppointmentList = () => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    if (localStorage.user) {
      const result = await axios.get('https://frozen-harbor-46293.herokuapp.com/appointments', { headers: JSON.parse(localStorage.user) });
      const { data } = result;
      setData(data);
    } else {
      <p>Not logged in yet..</p>;
    }
  }, []);

  return (
    <Container>
      <h3>Your Appointments</h3>
      {data.length === 0 ? (
        <>
          <h5>You do not have any appointments.</h5>
        </>
      ) : (
        <>
          {data.map(item => <AppointmentItem key={item.id} item={item} />)}
        </>
      )}
    </Container>
  );
};

export default AppointmentList;
