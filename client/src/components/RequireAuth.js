import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const RequireAuth = () => {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    /* const location = useLocation();

    function isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    } */
    
    useEffect(() => {
        console.log("requireAuth")
        setIsLoading(false);

    }, [token]);

    return (
        isLoading ? (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        ) : token ? (
            <Outlet />
        ) : (
            <Navigate to="/login" />
        )

      
    );
}

export default RequireAuth;
