import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

function PublicNavigation() {
    const navigate = useNavigate();

    return (
        <header className="main-header">
            <nav className="d-flex justify-content-between align-items-center pe-5 ps-5">
                <div className="p-4">
                    <h2 className='site-title'>Taskify - The Next Gen Project Management Tool</h2>
                </div>
              
            </nav>
        </header>
    );
}

export default PublicNavigation;
