import axios from "axios";

const api = axios.create({
  baseURL: process.env.PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const fastApi = axios.create({
  baseURL: process.env.FAST_API_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export { api, fastApi };
