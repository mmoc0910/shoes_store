import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    "Content-Type": "Application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    "Content-Type": "Application/json",
  },
});
