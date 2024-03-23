import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import TaskCreationDialog from './TaskCreationDialog';
import { useProjectUsers, useProjectTasks, useUsers, useTasks } from '../hooks/useApi';
import TaskTableRow from './TaskTableRow';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function Project() {
 
    const { token } = useAuth();
    const { id } = useParams();
   
    const [project, setProject] = useState(null);

    const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);

    const [trackChanges, setTrackChanges] = useState(false);

    async function getProject() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API }/project/${id}`);
            setProject(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const projectUsers = useProjectUsers();
    const projectTasks = useProjectTasks({isTaskDialogOpen, trackChanges});
    const users = useUsers({ role: ''});
    const tasks = useTasks({isTaskDialogOpen, trackChanges});

    const handleOpenTaskDialog = () => {
        setTaskDialogOpen(true); 
    };

    const handleCloseTaskDialog = () => {
        setTaskDialogOpen(false); 
    };


    useEffect(() => {
      getProject()
    }, []);

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
                <button type="button" onClick={handleOpenTaskDialog}>Create Task</button> 

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Assignee</TableCell>
                                {/*    <TableCell>Edit</TableCell> */}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projectTasks
                                .filter(task => task.project_id === Number(id))
                                .map(task => (
                                    <TaskTableRow 
                                    key={task.task_id} 
                                    task={task} 
                                    tasks={tasks}
                                    setTrack={setTrackChanges}
                                   
                                     />
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
