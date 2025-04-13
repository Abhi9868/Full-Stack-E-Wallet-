import axios from 'axios';
const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
console.log(import.meta.env.VITE_NODE_ENV); // Check if in production mode

const instance = axios.create({
    baseURL: isProduction ? 'https://full-stack-e-wallet.vercel.app/api' : 'http://localhost:5000/api',

    withCredentials: true, // ⬅️ Important for sending cookies
});

export default instance;
