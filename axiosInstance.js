import axios from 'axios';

const token = sessionStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/deletepost', // Your API base URL
  headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  },
});

export default axiosInstance;