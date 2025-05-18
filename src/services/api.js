import axios from "axios";

//Base da url = https://api.themoviedb.org/3/
//URLAPI = https://api.themoviedb.org/3/movie/550?api_key=4f27e44422974ff29b634b3d571ac631

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
