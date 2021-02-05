import React from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Button, Alert, Container,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import propTypes from 'prop-types';
import addUserId from '../actions/user';

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
    const { routeProps, onFetch } = this.props;
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
      onFetch(response.data.data.id);
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
      <Container>
        {error && (
          <Alert variant="danger" onClose={() => this.setState({ error: false })} dismissible>
            <Alert.Heading>Invalid email or password!</Alert.Heading>
          </Alert>
        )}
        <div className="w-25 mx-auto mt-3">
          <h3>Log in.</h3>
          <Form onSubmit={this.handleLogin}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control id="email" type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control id="password" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Form>
          <p className="my-1">You do not have an account?</p>
          <Link to="/signup" className="h5">Sign-up</Link>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onFetch: data => dispatch(addUserId(data)),
});

Login.propTypes = {
  onFetch: propTypes.func.isRequired,
  routeProps: propTypes.objectOf(propTypes.object),
  history: propTypes.objectOf(propTypes.func.isRequired),
};

Login.defaultProps = {
  routeProps: { history: 'no value' },
  history: {},
};

const ConnectLogin = connect(null, mapDispatchToProps)(Login);

export { ConnectLogin as default, Login };
