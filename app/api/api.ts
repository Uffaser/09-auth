import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-backend-kbra.onrender.com/',
  withCredentials: true,
});