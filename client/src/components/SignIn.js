import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { token, setToken } = useAuth();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    /*    useEffect(() => {
         // Überprüfen, ob der Benutzer bereits angemeldet ist
         if (token && localStorage.getItem("token")) {
           // Wenn ja, weiterleiten zur Hauptseite
           navigate('/');
         }
       }, [token]); */


    const axiosInstance = axios.create({ timeout: 2000, baseURL: "http://localhost:4000", withCredentials: true })

    const handleLogin = async (e) => {
        e.preventDefault();
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
            console.log("response: " + response.data, response.status); // Erfolgreiche Antwort vom Server

            if (response.status >= 200 && response.status < 300) {
                localStorage.setItem("expiration", new Date().getTime() + 1000 * 60 * 60 * 24)
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', token);

                setToken(token)
                navigate(from, { replace: true });

            } else {
                // Handle unsuccessful login
                console.error('Fehler beim Login:', response.status);
                setError('Fehler beim Login');
            }


        } catch (err) {
            console.error('Fehler beim Login:', err);
            setError('Fehler beim Login');
        }
    };

    const showAuth = () => {
        console.log(token)
    }

    /*   if (token) {
          return <Navigate to="/" />;
      } */

    return (
        <div>
            <h2>Login</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to={`/register/`} style={{ display: 'block' }}>
                Registrieren
            </Link>
            <button type="button" onClick={showAuth}>Show Auth</button>
        </div>
    );
};

export default Login;
