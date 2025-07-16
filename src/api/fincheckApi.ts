import axios from 'axios';
const fincheckApi = axios.create({ baseURL: 'http://localhost:3000' });

fincheckApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default fincheckApi;
