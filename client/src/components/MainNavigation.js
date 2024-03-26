import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Typography, Button, Menu, MenuItem } from '@mui/material';
import { useProjects } from '../hooks/useApi';

function MainNavigation() {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const projects = useProjects();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
        setToken(null);
        navigate('/login');
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
                            <Button component={NavLink} to="/" activeClassName="active" className="nav-link" end>
                                Dashboard
                            </Button>
                        </li>
                        <li className="nav-item me-2">
                            <Button onClick={handleMenuOpen} className="nav-link">
                                Projects
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                getContentAnchorEl={null}
                            >
                                {projects?.map((project) => (
                                    <MenuItem key={project.id} onClick={handleMenuClose}>
                                        <NavLink to={`/project/${project.id}`} className="nav-link-dropdown">
                                            {project.name}
                                        </NavLink>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </li>
                        <li className="nav-item me-2">
                            <Button component={NavLink} to="/profile" activeClassName="active" className="nav-link">
                                Profile
                            </Button>
                        </li>
                        <li className="nav-item me-2">
                            <Button component={NavLink} to="/people" activeClassName="active" className="nav-link">
                                People
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className="nav nav-pills mt-4 d-flex flex-row align-self-center">
                    <Button onClick={handleLogout} className="btn btn-primary">
                        <i className="bi bi-box-arrow-left"></i> Logout
                    </Button>
                </div>
            </nav>
        </header>
    );
}

export default MainNavigation;
