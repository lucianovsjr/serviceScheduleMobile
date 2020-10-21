import axios from 'axios';

export const BASE_URL = 'http://10.0.2.2:8000';
//export const BASE_URL = 'https://lucianovsjr-calendar.herokuapp.com';

const api = axios.create({
  baseURL: `${BASE_URL}/api/`
});

export default api;
