import axios from 'axios';
import type { AxiosInstance } from 'axios';

export function createHttpClient(baseURL: string): AxiosInstance {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 15_000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(async (config) => {
        return config;
    });

    instance.interceptors.response.use(
        (response) => {
            if (response && response.data) return response.data.data;
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    return instance(originalRequest);
                } catch (error) {
                    console.error('Error fetching new token:', error);
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
}
