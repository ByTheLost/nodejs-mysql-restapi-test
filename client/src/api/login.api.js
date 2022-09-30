import axios from 'axios';

export const createLoginRequest = async (user) =>
  await axios.post('http://localhost:4000/auth/signin', user)