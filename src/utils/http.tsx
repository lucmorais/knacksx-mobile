import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
    baseURL: 'http://192.168.1.12:3001'
});