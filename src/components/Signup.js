import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import propTypes from 'prop-types';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      username: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSignup = e => {
    const {
      email, password, name, username,
    } = this.state;
    const { routeProps } = this.props;
    const { history } = routeProps;
    e.preventDefault();
    const url = 'https://frozen-harbor-46293.herokuapp.com/auth';
    axios({
      url,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        email,
        password,
        name,
        username,
      },
    }).then(response => {
      localStorage.setItem('user',
        JSON.stringify({
          'access-token': response.headers['access-token'],
          client: response.headers.client,
          uid: response.data.data.uid,
          id: response.data.data.id,
          name: response.data.data.name,
          username: response.data.data.username,
        }));
      history.push('/');
    }).catch(error => {
      <p>{error}</p>;
    });
  }

  render() {
    const {
      email, password, name, username,
    } = this.state;
    return (
      <>
        <h3>Sign up.</h3>
        <Form onSubmit={this.handleSignup}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" name="name" value={name} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter your username" name="username" value={username} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </>
    );
  }
}

Signup.propTypes = {
  routeProps: propTypes.objectOf(propTypes.object),
  history: propTypes.objectOf(propTypes.func.isRequired),
};

Signup.defaultProps = {
  routeProps: { history: 'no value' },
  history: {},
};

export default Signup;
