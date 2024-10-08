import axios from 'axios';

const { VITE_APP_BASE_URL } = import.meta.env
const apiClient = axios.create({
    baseURL: `${VITE_APP_BASE_URL}`,
    withCredentials: true,
    // timeout: 1000, 
});


apiClient.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

const GET = async (url, params = {}, config = {}) => {
    try {
        const response = await apiClient.get(url, { params, ...config });
        return response;
    } catch (error) {
        throw error;
    }
};

const POST = async (url, data, config = {}) => {
    try {
        const response = await apiClient.post(url, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

const PUT = async (url, data, config = {}) => {
    try {
        const response = await apiClient.put(url, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

const DELETE = async (url, config = {}) => {
    try {
        const response = await apiClient.delete(url, config);
        return response;
    } catch (error) {
        throw error;
    }
};


export { GET, POST, PUT, DELETE }
