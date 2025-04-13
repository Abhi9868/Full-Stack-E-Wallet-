import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://full-stack-e-wallet.vercel.app/api', // 🔁 Replace with your actual backend URL if different

    withCredentials: true, // ⬅️ Important for sending cookies
});

export default instance;
