import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../context/AuthProvider";


/** https://stackoverflow.com/questions/51109559/get-cookie-with-react */

const RequireAuth = () => {

    const API_URL = process.env.REACT_APP_API /* || 'http://localhost:4000' */;

    const axiosInstance = axios.create({
        baseURL: API_URL,
        withCredentials: true
    });

    /* const { token, setToken } = useContext(AuthContext);  */
    const { token, setToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        console.log("requireAuth hi!")

      

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/secrets');

                if (!token || Object.keys(token).length < 1) {

                    if (response.status == 200) {
                        setToken(response.data)
                        console.log(JSON.stringify(response.data))
                        localStorage.setItem("user", JSON.stringify(response.data))
                    } else {    
                        console.log("token nicht vorhanden ...")
                        setToken(null)
                        localStorage.removeItem("user");
                    }

                }

            } catch (error) {
                // Fehlerhafte Antwort
                if (error.response && error.response.status === 401) {
                    // Wenn nicht autorisiert, setze den Token auf null
                    setToken(null);
                    localStorage.removeItem("user");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        /*    setIsLoading(false); */
    }, [token, location.pathname]);

    if (isLoading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        );
    }


    return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
