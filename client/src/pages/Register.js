import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, TextField, Button, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API }/users`, { username, password, role });
      console.log('Neuer Benutzer wurde erfolgreich registriert:', response.data);
      alert("Erfolgreich registriert")
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      setError('Fehler bei der Registrierung');
    }
  };

  return (
    <div>
      <Typography component="h2" variant="h5" sx={{ marginBottom: 2 }}>Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
        {/*   <MenuItem value="admin">Admin</MenuItem> */}
          <MenuItem value="developer">Developer</MenuItem>
          <MenuItem value="guest">Guest</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={handleRegister}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}>
        Register
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/login" variant="body2" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
