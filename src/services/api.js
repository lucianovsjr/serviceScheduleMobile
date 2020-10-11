import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/'
  //baseURL: 'http://192.168.1.64:8000/api/'
  //baseURL: 'https://lucianovsjr-calendar.herokuapp.com/api/'
});

export default api;
