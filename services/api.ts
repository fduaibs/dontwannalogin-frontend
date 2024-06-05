import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
})

const getBasicAuthHeader = () => {
  const username = process.env.NEXT_PUBLIC_BASIC_AUTH_USER;
  const password = process.env.NEXT_PUBLIC_BASIC_AUTH_PASS;
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${token}`;
};

api.interceptors.request.use(
  config => {
    const basicAuthHeader = getBasicAuthHeader();
    if (basicAuthHeader) {
      config.headers.Authorization = basicAuthHeader;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

