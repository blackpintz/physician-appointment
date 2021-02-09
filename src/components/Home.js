import React, { useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import addPhysician from '../actions/physician';

const Home = ({ onFetch, physician }) => {
  useEffect(async () => {
    if (localStorage.user) {
      const result = await axios.get('https://frozen-harbor-46293.herokuapp.com/physicians', { headers: JSON.parse(localStorage.user) });
      const { data } = result;
      onFetch(data);
    } else {
      <p>Not logged in yet..</p>;
    }
  }, []);
  return (
    <Container>
      <h3 className="mt-2">Available Physicians</h3>
      {physician.map(item => (
        <Card key={item.id} className="mb-2 w-50">
          <Card.Body>
            <Card.Title>{item.category}</Card.Title>
            <Link to={`/physician/${item.id}`}>
              <Button variant="info">Book an appointment</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

const mapStateToProps = state => ({
  physician: state.physician,
});

const mapDispatchToProps = dispatch => ({
  onFetch: data => dispatch(addPhysician(data)),
});

Home.propTypes = {
  onFetch: propTypes.func.isRequired,
  physician: propTypes.arrayOf(propTypes.object),
};

Home.defaultProps = {
  physician: [{ value: '' }],
};

const ConnectHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export { ConnectHome as default, Home };
