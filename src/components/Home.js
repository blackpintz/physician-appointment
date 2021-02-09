import React, { useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Container, Carousel,
} from 'react-bootstrap';
import addPhysician from '../actions/physician';
import docKit from '../images/stethescope.jpg';

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
    <Container className="w-50">
      <h3 className="mt-2">Available Physicians</h3>
      <Carousel>
        {physician.map(item => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={docKit}
              alt="slide"
            />
            <Carousel.Caption>
              <h3 className="text-dark font-weight-bolder">{item.category}</h3>
              <Link to={`/physician/${item.id}`}>
                <Button variant="success">Book an appointment</Button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
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
