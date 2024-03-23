import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { Typography, Button } from '@mui/material';

function MainNavigation() {
    const navigate = useNavigate();

    const { token, setToken } = useAuth();

    const [user, setUser] = useState();

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user')
        localStorage.removeItem('expiration')
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="main-header">
            <nav className="d-flex justify-content-between align-items-center pe-5 ps-5">
                <div className="p-2 mb-4">
                    <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                        <NavLink to="/" className="text-decoration-none mt-1 site-title" sx={{ color: 'white' }}>
                            Taskify
                        </NavLink>
                    </Typography>
                    <ul className="nav nav-pills mt-4 d-flex flex-row align-self-center">
                        <li className="nav-item me-2">
                            <NavLink to="/" className="nav-link" end>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item me-2">
                            <NavLink to="/board" className="nav-link" >
                                Board
                            </NavLink>
                        </li>
                        <li className="nav-item me-2">
                            <NavLink to="/about" className="nav-link">
                                About
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="nav nav-pills mt-4 d-flex flex-row align-self-center">
                    <button onClick={handleLogout} className="btn btn-primary">
                        <i className="bi bi-box-arrow-left"></i> Ausloggen
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default MainNavigation;
