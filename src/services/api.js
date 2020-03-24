import axios from 'axios';

const api = axios.create({
  baseURL: 'https://devradarmourabackend.herokuapp.com/'
});

export default api;