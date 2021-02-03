import React from 'react';
import propTypes from 'prop-types';

const AppointmentItem = ({ item }) => {
  const { city, user, physician } = item;
  const { email } = user;
  const { category } = physician;
  return (
    <>
      <p>Each Appointment goes here.</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Category: ${category}`}</p>
      <p>{city}</p>
    </>
  );
};

AppointmentItem.propTypes = {
  item: propTypes.objectOf(propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.object,
  ])),
};

AppointmentItem.defaultProps = {
  item: { city: 'no value' },
};

export default AppointmentItem;
