import React, { useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import AppointmentItem from './AppointmentItem';
import addAppointment from '../actions/appointment';

const AppointmentList = ({ onFetch, appointment }) => {
  useEffect(async () => {
    if (localStorage.user) {
      const result = await axios.get('https://frozen-harbor-46293.herokuapp.com/appointments', { headers: JSON.parse(localStorage.user) });
      const { data } = result;
      onFetch(data);
    } else {
      <p>Not logged in yet..</p>;
    }
  }, []);

  return (
    <Container>
      <h3>Your Appointments</h3>
      {appointment.length === 0 ? (
        <>
          <h5>You do not have any appointments.</h5>
        </>
      ) : (
        <>
          {appointment.map(item => <AppointmentItem key={item.id} item={item} />)}
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  appointment: state.appointment,
});

const mapDispatchToProps = dispatch => ({
  onFetch: data => dispatch(addAppointment(data)),
});

AppointmentList.propTypes = {
  onFetch: propTypes.func.isRequired,
  appointment: propTypes.arrayOf(propTypes.object),
};

AppointmentList.defaultProps = {
  appointment: [{ value: '' }],
};

const ConnectAppointmentList = connect(mapStateToProps, mapDispatchToProps)(AppointmentList);

export { ConnectAppointmentList as default, AppointmentList };
