// Importe
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';

// Funktionskomponente für die Registrierung
function Register() {
  // Zustände für die Eingabefelder
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Zustand für die Rolle

  const navigate = useNavigate();

  // Handler für die Benutzerregistrierung
  const handleRegister = async () => {
    try {
      // Sende eine POST-Anfrage an die API zum Erstellen eines neuen Benutzers
      const response = await axios.post('http://localhost:4000/users', { username, password, role });
      console.log('Neuer Benutzer wurde erfolgreich registriert:', response.data);
      // Optional: Weiterleitung nach erfolgreicher Registrierung
      // Hier kannst du die Weiterleitung nach deinen Anforderungen anpassen
      alert("Erfolgreich registriert")

      setTimeout(() => {
        navigate("/login")
      }, 2000)
      // history.push('/login'); // Beispiel: Weiterleitung zur Login-Seite
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      // Behandlung von Fehlern hier...
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="guest">Guest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" onClick={handleRegister}>Register</Button>
    </div>
  );
}

export default Register;
