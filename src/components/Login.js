import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin = e => {
    const { email, password } = this.state;
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
      console.log(response);
      localStorage.setItem('user',
        JSON.stringify({
          'access-token': response.headers['access-token'],
          client: response.headers.client,
          uid: response.data.data.uid,
        }));
      window.location = '/';
    }).catch(error => {
      console.log(`There is an ${error}.`);
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <>
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
      </>
    );
  }
}

export default Login;
