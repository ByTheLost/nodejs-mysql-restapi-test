import axios from 'axios';

export const getUsersRequest = async (user) =>
  await axios.get('http://localhost:4000/users', user);

export const createUserRequest = async (user) =>
  await axios.post('http://localhost:4000/auth/signup', user);

export const deleteUserRequest = async (id) =>
  await axios.delete(`http://localhost:4000/users/${id}`);

export const getUserRequest = async (id) =>
  await axios.get(`http://localhost:4000/users/${id}`);

export const updateUserRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/users/${id}`, newFields);