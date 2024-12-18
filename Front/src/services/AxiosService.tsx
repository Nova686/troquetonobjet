import axios from 'axios';
import config from '../config.json'

// Créez une instance Axios
const axiosService = axios.create({
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosService.interceptors.request.use(
    (config) => {
        const token = "2|7ibuw8Uf1EVFMJ4mbtHtcCe0yh5EWXYaiDG1u8YOae9e7fda";
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosService;
