import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TaskCreationDialog from '../dialog/TaskCreationDialog';
import { useProjectUsers, useProjectTasks, useUsers, useTasks } from '../hooks/useApi';
import TaskTableRow from '../components/TaskTableRow';
import { Card, CardContent, CardHeader, Typography, Grid, Select, MenuItem, InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function People() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
    const [trackChanges, setTrackChanges] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const users = useUsers({ role: '' });
    
    return (
        <div className="main" style={{ width: '100%', display: 'flex', gap: 20 }}>
            <div className="projects" style={{ width: '60%' }}>
                <h2>CEO</h2>
                <h2>lkdsfjldsf</h2>
                <Grid container spacing={2}>
                    {users && users.length > 0 && users.filter(user => user.role === 'admin').map((project) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                            <Card style={{ backgroundColor: 'black', color: 'white', height: '100%', cursor: 'pointer' }} >
                                <CardContent>
                                    <CardHeader
                                        title={project.username}
                                        subheader={`ID: ${project.id}`}
                                        titleTypographyProps={{ variant: 'h5' }}
                                        subheaderTypographyProps={{ variant: 'body2' }}
                                    />
                                    <Typography variant="body1" component="p" style={{ marginBottom: '1rem' }}>
                                        {project.role}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>

                    ))}
                </Grid>


                <h2 style={{ marginTop: '2rem' }} >Developer</h2>
                <Grid container spacing={2} /* style={{ marginTop: '2rem' }}  */>

                    {users && users.length > 0 && users.filter(user => user.role === 'developer').map((project) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                            <Card style={{ backgroundColor: 'black', color: 'white', height: '100%', cursor: 'pointer' }} >
                                <CardContent>
                                    <CardHeader
                                        title={project.username}
                                        subheader={`ID: ${project.id}`}
                                        titleTypographyProps={{ variant: 'h5' }}
                                        subheaderTypographyProps={{ variant: 'body2' }}
                                    />
                                    <Typography variant="body1" component="p" style={{ marginBottom: '1rem' }}>
                                        {project.role}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>

                    ))}
                </Grid>

                <h2 style={{ marginTop: '2rem' }} >Guest</h2>
                <Grid container spacing={2} /* style={{ marginTop: '2rem' }}  */>

                    {users && users.length > 0 && users.filter(user => user.role === 'guest').map((project) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                            <Card style={{ backgroundColor: 'black', color: 'white', height: '100%', cursor: 'pointer' }} >
                                <CardContent>
                                    <CardHeader
                                        title={project.username}
                                        subheader={`ID: ${project.id}`}
                                        titleTypographyProps={{ variant: 'h5' }}
                                        subheaderTypographyProps={{ variant: 'body2' }}
                                    />
                                    <Typography variant="body1" component="p" style={{ marginBottom: '1rem' }}>
                                        {project.role}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>

                    ))}
                </Grid>

                <h2 style={{ marginTop: '2rem'}} >No role</h2>
                <Grid container spacing={2} style={{ marginBottom: '2rem' }} >

                    {users && users.length > 0 && users.filter(user => user.role === null).map((project) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                            <Card style={{ backgroundColor: 'black', color: 'white', height: '100%', cursor: 'pointer' }} >
                                <CardContent>
                                    <CardHeader
                                        title={project.username}
                                        subheader={`ID: ${project.id}`}
                                        titleTypographyProps={{ variant: 'h5' }}
                                        subheaderTypographyProps={{ variant: 'body2' }}
                                    />
                                    <Typography variant="body1" component="p" style={{ marginBottom: '1rem' }}>
                                        {project.role}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>

                    ))}
                </Grid>
            </div>

        </div>
    );
}

export default People;
