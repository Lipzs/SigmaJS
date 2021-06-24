import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const apiService = axios.create({
  baseURL: 'http://localhost:3333'
});


apiService.interceptors.request.use((async (config) => {

  const token = localStorage.getItem('TOKEN');

  if (token) {
    config.headers.token = token;
  }
  return config;
}));

export default apiService;