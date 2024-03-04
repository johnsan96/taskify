import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from '../components/Main'
import SignIn from "../components/SignIn";
import Register from "../components/Register";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<Main />} />
        </Routes>
    );
};

export default AppRoutes;
