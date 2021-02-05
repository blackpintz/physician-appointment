import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import {
  Form, Button, Container, Row, Col, Image,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import doctorImg from '../images/doctor.jpg';

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
      validated: false,
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
    this.setState({ validated: true });
  }

  render() {
    const {
      date, city, validated,
    } = this.state;
    return (
      <Container>
        <Row className="physician">
          <Col className="col-8 my-3">
            <Image src={doctorImg} alt="doctor" fluid className="doctor" />
          </Col>
          <Col>
            <Form noValidate validated={validated} className="d-flex flex-column justify-content-center form" onSubmit={this.handleSubmit}>
              <Form.Text className="h4 mb-3 ml-4">Book an Appointment.</Form.Text>
              <Form.Group as={Row}>
                <Form.Label column className="h4 col-1 mr-2">City</Form.Label>
                <Col className="col-9">
                  <Form.Control required type="text" placeholder="Enter City" value={city} name="city" onChange={this.handleChange} />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid city.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column className="h4 col-1 mr-3">Date</Form.Label>
                <Col className="col-9">
                  <DatePicker
                    selected={date}
                    onChange={date => this.setState({ date })}
                    minDate={moment().toDate()}
                  />
                </Col>
              </Form.Group>
              <Button
                disabled={city.length < 3 && true}
                variant="primary"
                type="submit"
                className="ml-5 w-75"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
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
