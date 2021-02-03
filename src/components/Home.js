import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
    <>
      <h3>See all your appointments here.</h3>
      <h2>Available Physicians</h2>
      <ul>
        {data.map(item => (
          <li key={item.id} className="h4">
            {item.category}
            <Link to={`/physician/${item.id}`}>
              <Button variant="info">Book an appointment</Button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
