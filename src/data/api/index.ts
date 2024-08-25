import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_URL_BASE;

export const API = axios.create({
  baseURL
});
