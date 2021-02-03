import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Physician extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props;
    const user = JSON.parse(localStorage.user);
    this.state = {
      userId: user.id,
      physicianId: id,
      date: new Date(),
      city: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = e => {
    const {
      userId, physicianId, date, city,
    } = this.state;
    const { routeProps } = this.props;
    const { history } = routeProps;
    e.preventDefault();
    const url = 'https://frozen-harbor-46293.herokuapp.com/appointments';
    axios({
      url,
      method: 'POST',
      headers: JSON.parse(localStorage.user),
      data: {
        appointment: {
          user_id: userId,
          physician_id: physicianId,
          date,
          city,
        },
      },
    }).then(() => {
      history.push('/appointments');
    });
  }

  render() {
    const {
      userId, physicianId, date, city,
    } = this.state;
    return (
      <>
        <h3>Physician form goes here!</h3>
        <p>{userId}</p>
        <p>{physicianId}</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" value={city} name="city" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={date}
              onChange={date => this.setState({ date })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

Physician.propTypes = {
  id: propTypes.string,
  routeProps: propTypes.objectOf(propTypes.object),
  history: propTypes.objectOf(propTypes.func.isRequired),
};

Physician.defaultProps = {
  id: '',
  routeProps: { history: 'no value' },
  history: {},
};

export default Physician;
