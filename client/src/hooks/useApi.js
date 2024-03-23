// useApi.js

import { useState, useEffect } from 'react';
import { getProjects, getUsers } from '../lib/api';

export function useProjects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    getProjects()
      .then(data => setProjects(data))
      .catch(error => console.error(error));
  }, []);

  return projects;
}

export function useUsers({ role, test }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers({ role, test })
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, [role]);

  return users;
}
