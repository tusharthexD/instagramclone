import axios from 'axios';

const token = sessionStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'https://instaclonebe-rfqu.onrender.com', // Your API base URL
  headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  },
});

export default axiosInstance;