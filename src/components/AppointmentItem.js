import React from 'react';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const AppointmentItem = ({ item }) => {
  const {
    city, physician, date, id,
  } = item;
  const { category } = physician;
  return (
    <Card key={id} className="w-50 mb-3">
      <Card.Header as="h5" />
      <Card.Body>
        <Card.Title className="text-secondary">{`${category} appointment on ${date}, at ${city}`}</Card.Title>
      </Card.Body>
    </Card>

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
