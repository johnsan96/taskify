import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Main() {

  const [users, setUsers] = useState(null);

  async function getUsers() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      console.log(response);

      setUsers(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUsers();

  }, [])

  return (
    <div className="main">
      <h1>Task-App!</h1>

      <ul className="user-container">
        {users && users.length > 0 && users.map((user) => {
          return (
            <li key={user.id}>{user.vorname}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default Main;
