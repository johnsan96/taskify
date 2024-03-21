import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";

function Main() {

  const navigate = useNavigate();
  const { token, setToken } = useAuth();
 /*  const [tasks, settasks] = useState(null); */
  const [user, setUser] = useState();

  const [projects, setProjects] = useState(null);

 /*  async function gettasks() {
    try {
      const response = await axios.get('http://localhost:4000/tasks');
      console.log(response);

      settasks(response.data)
    } catch (error) {
      console.error(error);
    }
  } */

  async function getProjects() {
    try {
      const response = await axios.get('http://localhost:4000/projects');
      console.log(response);

      setProjects(response.data)
    } catch (error) {
      console.error(error);
    }
  } 


  const showAuth = () => {
    console.log(token)
  }

  const handleLogout = () => {
    // Lösche den Token aus dem Local Storage
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    localStorage.removeItem('expiration')
    // Setze den Token auf null im AuthContext
    setToken(null);
    // Setze den Benutzer auf null
    setUser(null);
    // Optional: Weiterleitung zur Login-Seite
    navigate('/login');
  };


  useEffect(() => {
    getProjects();

    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.username) {
      setUser(user);

      console.log("user: " + user)
    } else {

      /*   console.log("user existiert nicht")
        handleLogout() */
    }


  }, [])

  if (!token || Object.keys(token).length < 1)

    return (
      <Navigate to="/login" />
    )


  return (
    <div className="main" style={{ width: '100%' }}>
      <h1>Taskify</h1>

      <h2> welcome {user?.username}</h2>

      <div className="projects" style={{ width: '50%' }}>
        <h1>All Projects</h1>
        {projects && projects.length > 0 && projects.map((project) => (
          <div key={project.id} style={{ marginBottom: '10px' }}>
            <Link to={`/project/${project.id}`} style={{ display: 'block' }}>
              {project.name}  
            </Link>
          </div>
        ))}
      </div>

      <button type="button" onClick={showAuth}>Show Auth</button>

      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Main;
