import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const RequireAuth = () => {
    const { token, setToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {

        console.log("requireAuth")

        if (!token || Object.keys(token).length < 1) {

            let tokenLocalStorage = localStorage.getItem('token');

            if(tokenLocalStorage) {
                setToken(tokenLocalStorage)
            }else {
                console.log("token nicht vorhanden ...")
                setToken(null)
            }
        
        }
         
        setIsLoading(false);
    }, [token]);

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
