import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_URL_BASE;

const API = axios.create({
  baseURL,
});

export { API };
