import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_PUBLIC_ART_STORE_API,
});
