import axios from "axios";

const API = axios.create({
  baseURL: "https://nc-board-game-reviewing.herokuapp.com/api/",
});

export default API;
