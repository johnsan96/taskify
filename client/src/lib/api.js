import axios from 'axios';
/* import { API_URL } from './env'; */

export const API_URL = process.env.REACT_APP_API /* || 'http://localhost:4000' */;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export async function getProjects(params) {
  try {
    const response = await axiosInstance.get('/projects', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUsers(params) {
  try {
    const response = await axiosInstance.get('/users', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
