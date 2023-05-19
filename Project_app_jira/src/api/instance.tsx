import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token")!)}`,
  },
});

export default instance;
