import React from 'react';
import {
  Form, Button, Alert, Container,
} from 'react-bootstrap';
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
      error: false,
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
      this.setState({ error: true });
    });
  }

  render() {
    const {
      email, password, name, username, error,
    } = this.state;
    return (
      <Container>
        {error && (
        <Alert variant="danger" onClose={() => this.setState({ error: false })} dismissible>
          <Alert.Heading>The sign up details are not correct!</Alert.Heading>
        </Alert>
        )}
        <div className="w-25 mx-auto mt-2">
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
              <Form.Control id="email" type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control id="password" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Form>
          <p className="my-1">Already have an account?</p>
          <Link to="/login" className="h5">Login</Link>
        </div>
      </Container>
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
