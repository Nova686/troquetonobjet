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
        const token = "22|MZYXX3bc4Lvw7yf10MxSgMOnSShUG6iRNlqjt2INe89fcf24";
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
