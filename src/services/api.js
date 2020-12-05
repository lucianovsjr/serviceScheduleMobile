import axios from 'axios';

const BASE_URL_DEV = 'http://10.0.2.2:8000';
const BASE_URL_PROD = 'https://lucianovsjr-calendar.herokuapp.com';
export const BASE_URL = __DEV__ ? BASE_URL_DEV : BASE_URL_PROD;
// export const BASE_URL = 'https://lucianovsjr-calendar.herokuapp.com';

const api = axios.create({ baseURL: `${BASE_URL}/api/` });

export default api;
