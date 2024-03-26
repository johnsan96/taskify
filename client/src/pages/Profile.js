import React from 'react';
import { Avatar, Button, Container, Typography, Grid, TextField, Link } from '@mui/material';

const Profile = () => {
 
    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <Container component="main" >
            <div>
                <Avatar />
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Benutzername:</strong> {userData.username}
                        </Typography>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Rolle:</strong> {userData.role}
                        </Typography>
                    </Grid>
                </Grid>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                 
                >
                    Profil aktualisieren
                </Button>
               
            </div>
        </Container>
   

    );
};

export default Profile;
