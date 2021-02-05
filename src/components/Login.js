import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import propTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin = e => {
    const { email, password } = this.state;
    const { routeProps } = this.props;
    const { history } = routeProps;
    e.preventDefault();
    const url = 'https://frozen-harbor-46293.herokuapp.com/auth/sign_in';
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
      this.setState({
        email: '',
        password: '',
        error: true,
      });
      history.push('/');
    }).catch(error => {
      <p>{error}</p>;
      this.setState({ error: true });
    });
  }

  render() {
    const {
      email, password, error,
    } = this.state;
    return (
      <>
        {error && <p>Your login credentials are incorrect.</p>}
        <h3>Log in.</h3>
        <Form onSubmit={this.handleLogin}>
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
        <p>You do not have an account?</p>
        <Link to="/signup">Sign-up</Link>
      </>
    );
  }
}

Login.propTypes = {
  routeProps: propTypes.objectOf(propTypes.object),
  history: propTypes.objectOf(propTypes.func.isRequired),
};

Login.defaultProps = {
  routeProps: { history: 'no value' },
  history: {},
};

export default Login;
