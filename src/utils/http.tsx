import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
    baseURL: 'http://192.168.0.13:3001'
});