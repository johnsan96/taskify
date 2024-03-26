import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TaskCreationDialog from './TaskCreationDialog';
import { useProjectUsers, useProjectTasks, useUsers, useTasks } from '../hooks/useApi';
import TaskTableRow from './TaskTableRow';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog,DialogTitle, DialogContent, DialogActions } from '@mui/material';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
    const [trackChanges, setTrackChanges] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    useEffect(() => {
        getProject();
    }, []);

    const [isUserInProject, setIsUserInProject] = useState(false);

    async function getProject() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/project/${id}`);
            setProject(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function joinProject() {
        try {
            await axios.post(`${process.env.REACT_APP_API}/projectUsers`, { project_id: id, user_id: user.id });
            setTrackChanges(prevTrackChanges => !prevTrackChanges);
        } catch (error) {
            console.error('Fehler beim Beitritt zum Projekt:', error);
        }
    }

    const projectUsers = useProjectUsers({ trackChanges });
    const projectTasks = useProjectTasks({ isTaskDialogOpen, trackChanges });
    const users = useUsers({ role: '' });
    const tasks = useTasks({ isTaskDialogOpen, trackChanges });

    useEffect(() => {
        const checkUserInProject = () => {
            const foundUser = projectUsers.find(projectUser => projectUser.user_id === user.id && projectUser.project_id === Number(id));
            setIsUserInProject(!!foundUser);
        };

        checkUserInProject();
    }, [projectUsers, trackChanges]);

    const handleOpenTaskDialog = () => {
        setTaskDialogOpen(true);
    };

    const handleCloseTaskDialog = () => {
        setTaskDialogOpen(false);
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteProject = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API}/project/${id}`);
            console.log('Projekt wurde gelöscht');

            navigate('/');
        } catch (error) {
            console.error('Fehler beim Löschen des Projekts:', error);
        }
    };

    return (
        <div className="main" style={{ width: '100%', display: 'flex', gap: 20 }}>
            <div className="projects" style={{ width: '60%' }}>
                <h2>{project?.name}{"  " + project?.id}</h2>

                <p>{project?.description}</p>
                {/*  <p>{"You are " + user.username + " " + user.role + " watching it. with id: "+user.id}</p> */}
                <Button onClick={handleDeleteDialogOpen} variant="contained" color="error" sx={{ marginTop: '10px', marginBottom: '20px' }}>Delete Project</Button>

                
                <h3>Project Participants</h3>

                <ul>
                    {projectUsers
                        .filter(user => user.project_id === Number(id))
                        .map(user => (
                            <li key={user.user_id}>
                                {users.find(u => u.id === user.user_id)?.username || 'Unknown User'}
                            </li>
                        ))}
                </ul>
                <h3>Project Tasks</h3>
                {isUserInProject ? (
                    <Button type="button" onClick={handleOpenTaskDialog}>Create Task</Button>
                ) : (
                    <Button type="button" onClick={joinProject}>Join Project</Button>
                )}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Assignee</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        {isUserInProject ?
                            <TableBody>
                                {projectTasks
                                    .filter(task => task.project_id === Number(id))
                                    .map(task => (
                                        <TaskTableRow
                                            key={task.task_id}
                                            task={task}
                                            tasks={tasks}
                                            setTrack={setTrackChanges}
                                            track={trackChanges}
                                            projectUsers={projectUsers.filter(user => user.project_id === Number(id))}
                                        />
                                    ))}
                            </TableBody>
                            : 

                            <p>Please join the project to see the tasks!</p>
                        
                        }

                    </Table>
                </TableContainer>
            </div>
            <div style={{ marginTop: 20 }}></div>
            <TaskCreationDialog open={isTaskDialogOpen} handleClose={handleCloseTaskDialog} project_id={id} />

            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this Project?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteProject} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            
            <div className='profile-card'>
                <p>NOW WATCHING AS:</p>
                <p>ID: {user.id}</p>
                <p>Name: {user.username}</p>
                <p>Role: {user.role}</p>
            </div>
        </div>
    );
}

export default Project;
