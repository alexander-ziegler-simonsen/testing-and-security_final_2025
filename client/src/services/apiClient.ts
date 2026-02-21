import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL ?? "https://localhost:7095/api"
//const baseUrl = "https://localhost:7095/api"

console.log("this is my base url",baseUrl);

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
    }
});

export default apiClient;