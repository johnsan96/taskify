import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Box, CircularProgress } from '@mui/material';
import useAuth from '../hooks/useAuth';
import handleLogin from '../lib/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { token, setToken } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newToken = await handleLogin(username, password);
            setToken(newToken);
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Fehler beim Login:', err);
            setError('Fehler beim Login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h3" sx={{ color: 'black', fontWeight: 'bold' }}>
                    Login
                </Typography>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <Box component="form" onSubmit={handleLoginFormSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </Box>
                <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    fullWidth
                    sx={{ mb: 2, bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                >
                    Registrieren
                </Button>

            </Box>
        </Container>
    );
};

export default Login;
