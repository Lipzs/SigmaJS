import axios from 'axios';
import { getToken } from './auth';

const apiService = axios.create({
  baseURL: 'http://localhost:3333'
});


apiService.interceptors.request.use((async (config) => {
  const token = getToken();

  if (token) {
    config.headers.token = token;
  }
  return config;
}));

export default apiService;