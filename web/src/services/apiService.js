import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:3333'
});


apiService.interceptors.request.use((async (config) => {

  const token = localStorage.getItem('TOKEN');

  if (token) {
    config.headers.Authorization = ` Bearer ${token}`;
  }
  return config;
}));

export default apiService;