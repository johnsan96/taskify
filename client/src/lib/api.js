import axios from 'axios';
/* import { API_URL } from './env'; */

export const API_URL = process.env.REACT_APP_API /* || 'http://localhost:4000' */;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
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

export async function getProjectUsers() {
    try {
      const response = await axiosInstance.get('/projectUsers');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  export async function getProjectTasks() {
    try {
      const response = await axiosInstance.get('/projectTasks');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  
  export async function getTasks() {
    try {
      const response = await axiosInstance.get('/tasks');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
