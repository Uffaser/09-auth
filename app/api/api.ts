import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://zero5-mail-and-img-1sy5.onrender.com',
  withCredentials: true,
});