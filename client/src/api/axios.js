import axios from 'axios';
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

const instance = axios.create({
    baseURL: isProduction ? 'http://localhost:5000/api' : 'https://full-stack-e-wallet.vercel.app/api',

    withCredentials: true, // ⬅️ Important for sending cookies
});

export default instance;
