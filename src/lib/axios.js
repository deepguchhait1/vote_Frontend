import axios from "axios";

const USER_BASE_URL = import.meta.env.VITE_USER_BASE_URL;
const ADMIN_BASE_URL = import.meta.env.VITE_ADMIN_BASE_URL;

export const userApi = axios.create({
  baseURL: USER_BASE_URL,
  withCredentials: true,
});

export const adminApi = axios.create({
  baseURL: ADMIN_BASE_URL,
  withCredentials: true,
});