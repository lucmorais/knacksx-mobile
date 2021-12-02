import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
    baseURL: 'http://192.168.0.14:3001'
});