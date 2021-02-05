import React from 'react';
import axios from 'axios';
import { useHistory, withRouter, Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import currentUser from '../helpers/currentUser';

const Menu = () => {
  const history = useHistory();
  const handleSignOut = e => {
    e.preventDefault();
    axios({
      method: 'DELETE',
      url: 'https://frozen-harbor-46293.herokuapp.com/auth/sign_out',
      data: JSON.parse(localStorage.user),
    })
      .then(() => {
        localStorage.removeItem('user');
        history.push('/login');
      });
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Doc-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/"><p className="text-white text-decoration-none h5 mr-4 mt-2">Home</p></Link>
            <Link to="/appointments"><p className="text-white text-decoration-none h5 mt-2">Appointments</p></Link>
          </Nav>
          <Nav>
            {currentUser() ? (
              <Button className="text-white text-decoration-none" variant="link" onClick={handleSignOut}>Logout</Button>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(Menu);
