import axios from 'axios';

export const handleLogin = async (username, password) => {

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API,
    });

    try {
        const token = btoa(`${username}:${password}`);
        const response = await axiosInstance.post(
            '/login',
            {},
            {
                headers: {
                    Authorization: `Basic ${token}`
                }
            }
        );
        if (response.status >= 200 && response.status < 300) {
            localStorage.setItem('expiration', new Date().getTime() + 1000 * 60 * 60 * 24);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', token);
            return token;
        } else {
            throw new Error('Fehler beim Login');
        }
    } catch (error) {
        throw error;
    }
};

export default handleLogin;
