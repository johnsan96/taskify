import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import TaskCreationDialog from './TaskCreationDialog';
import TaskDetailDialog from './TaskDetailDialog';
import TaskTableRow from './TaskTableRow';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function Project() {
    const navigate = useNavigate();
    const { token, setToken } = useAuth();
    const { id } = useParams();
    const [user, setUser] = useState();
    const [project, setProject] = useState(null);
    const [projectUsers, setProjectUsers] = useState([]);
    const [projectTasks, setProjectTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
    const [isTaskDetailDialogOpen, setTaskDetailDialogOpen] = useState(false);

    async function getProject() {
        try {
            const response = await axios.get(`http://localhost:4000/project/${id}`);
            setProject(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getProjectUsers() {
        try {
            const response = await axios.get(`http://localhost:4000/projectUsers`);
            setProjectUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getProjectTasks() {
        try {
            const response = await axios.get(`http://localhost:4000/projectTasks`);
            setProjectTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getUsers() {
        try {
            const response = await axios.get(`http://localhost:4000/users`);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getTasks() {
        try {
            const response = await axios.get(`http://localhost:4000/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleOpenTaskDialog = () => {
        setTaskDialogOpen(true); // Öffne den Dialog
    };

    const handleCloseTaskDialog = () => {
        setTaskDialogOpen(false); // Schließe den Dialog
    };


    const handleOpenTaskDetailDialog = () => {
        setTaskDetailDialogOpen(true); // Öffne den Dialog
    };

    const handleCloseTaskDetailDialog = () => {
        setTaskDetailDialogOpen(false); // Schließe den Dialog
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    useEffect(() => {
        Promise.all([getProject(), getProjectUsers(), getProjectTasks(), getUsers(), getTasks()])
            .then(() => {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user?.username) {
                    setUser(user);
                }
            })
            .catch(error => console.error(error));
    }, [isTaskDialogOpen]);

    if (!token || Object.keys(token).length < 1)
        return <Navigate to="/login" />

    return (
        <div className="main" style={{ width: '100%' }}>
            <div className="projects" style={{ width: '50%' }}>
                <h1>{project?.name}</h1>
                <p>{project?.description}</p>
                <h2>Project Participants</h2>
                <ul>
                    {projectUsers
                        .filter(user => user.project_id === Number(id))
                        .map(user => (
                            <li key={user.user_id}>
                                {users.find(u => u.id === user.user_id)?.username || 'Unknown User'}
                            </li>
                        ))}
                </ul>
                <h2>Project Tasks</h2>
                <button type="button" onClick={handleOpenTaskDialog}>Create Task</button> {/* Button zum Öffnen des Dialogs */}

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Assignee</TableCell>
                                {/*    <TableCell>Edit</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projectTasks
                                .filter(task => task.project_id === Number(id))
                                .map(task => (
                                    <TaskTableRow key={task.task_id} task={task} tasks={tasks} />
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

            <div style={{ marginTop: 20 }}></div>
         
         
            <TaskCreationDialog open={isTaskDialogOpen} handleClose={handleCloseTaskDialog} project_id={id} />

        </div>
    );
}

export default Project;
