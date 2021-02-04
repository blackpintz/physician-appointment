import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    if (localStorage.user) {
      const result = await axios.get('https://frozen-harbor-46293.herokuapp.com/physicians', { headers: JSON.parse(localStorage.user) });
      const { data } = result;
      setData(data);
    } else {
      <p>Not logged in yet..</p>;
    }
  }, []);
  return (
    <Container>
      <h3 className="mt-2">Available Physicians</h3>
      {data.map(item => (
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

export default Home;
