import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useProjects, useUsers } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, Typography, Grid, Select, MenuItem, InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import ProjectCreationDialog from '../dialog/ProjectCreationDialog';

function Main() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [trackChanges, setTrackChanges] = useState(false);

  const [selectedRole, setSelectedRole] = useState('');
  const users = useUsers({ role: selectedRole, test: "blabli" });
  const [openCreateProjectDialog, setOpenCreateProjectDialog] = useState(false);


  const handleCreateProjectDialogOpen = () => {
    setOpenCreateProjectDialog(true);
    setTrackChanges(false);
  };

  const handleCreateProjectDialogClose = () => {
    setOpenCreateProjectDialog(false);
  };

  useEffect(() => {
    console.log(trackChanges)
  }, [trackChanges])

  const projects = useProjects(trackChanges); 

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="main" style={{ width: '100%' }}>
      <h2 className='underline'> Welcome {user?.username}</h2>

      <div style={{ display: 'flex', gap: 20 }}>
        <div className="projects" style={{ width: '100%', marginTop: '20px' }}>
          <h2>All Projects</h2>
          <small>You are running this application in <b>{process.env.REACT_APP_API}</b> mode.</small>
          <Grid container spacing={2}>
            {projects && projects.length > 0 && projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                <Card style={{ backgroundColor: 'black', color: 'white', height: '100%', cursor: 'pointer' }} onClick={() => navigate(`/project/${project.id}`)}>
                  <CardContent>
                    <CardHeader
                      title={project.name}
                      subheader={`ID: ${project.id}`}
                      titleTypographyProps={{ variant: 'h5' }}
                      subheaderTypographyProps={{ variant: 'body2' }}
                    />
                    <Typography variant="body1" component="p" style={{ marginBottom: '1rem' }}>
                      {project.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" color="primary" onClick={handleCreateProjectDialogOpen} style={{ marginTop: '20px' }}>
            Create Project
          </Button>
        </div>

        <div className="users" style={{ width: '50%' }}>
          <h2>Members</h2>
          <InputLabel id="role-label">Select Role</InputLabel>
          <Select value={selectedRole} label={"Rolle"} labelId="role-label" onChange={(e) => setSelectedRole(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="guest">Guest</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
          {users && users.length > 0 && users.map((user) => (
            <div key={user.id} style={{ marginBottom: '10px' }}>
              <p style={{ display: 'block' }}>
                {user.username + " - "} {user.role ? user.role : "no role"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="mt-5" onClick={() => console.log(token)}>Show Auth</button>
      <ProjectCreationDialog open={openCreateProjectDialog} handleClose={handleCreateProjectDialogClose} setTrackChanges={setTrackChanges} />

    </div>
  );
}

export default Main;
