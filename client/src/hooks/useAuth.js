import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
    const { token: contextToken, setToken: setContextToken } = useContext(AuthContext);
    const [token, setToken] = useState(contextToken);

    useEffect(() => {
        if (contextToken && contextToken !== token) {
            setToken(contextToken);
        }
    }, [contextToken, token]);

    return { token, setToken: setContextToken };
};

export default useAuth;
