import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});


const token = localStorage.getItem("pizzaria_token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
