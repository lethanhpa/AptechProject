import axios from "axios";

// import { REFRESH_TOKEN, TOKEN } from "../constants";

const axiosClient = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});


export default axiosClient;
