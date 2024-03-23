import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { token } = useContext(AuthContext);
    useDebugValue(token, token => token ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;