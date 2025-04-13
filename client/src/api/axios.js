import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // 🔁 Replace with your actual backend URL if different

    withCredentials: true, // ⬅️ Important for sending cookies
});

export default instance;
