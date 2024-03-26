import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TaskDetailDialog from '../dialog/TaskDetailDialog';
import axios from 'axios';

function TaskTableRow({ task, tasks, setTrack, trackChanges, projectUsers }) {
    const [isTaskDetailDialogOpen, setTaskDetailDialogOpen] = useState(false);
    const [assignees, setAssignees] = useState([]);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleOpenTaskDetailDialog = () => {
        setTaskDetailDialogOpen(true);
        setTrack(false);
    };

    const handleCloseTaskDetailDialog = () => {
        setTaskDetailDialogOpen(false);
        fetchAssignees();
    };

    const getStatusString = (statusId) => {
        switch (statusId) {
            case 1:
                return 'Todo';
            case 2:
                return 'In Progress';
            case 3:
                return 'Completed';
            default:
                return 'Unknown Status';
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API}/tasks/${taskId}`);
            setTrack(true);
        } catch (error) {
            console.error('Fehler beim Löschen der Aufgabe:', error);
        }
    };

    async function fetchAssignees() {
        setTrack(true); 
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/taskAssignees?task_id=${task.task_id}`);
            const assigneesData = response.data;
            if (assigneesData.length > 0) {
                const userIds = assigneesData.map(assignee => assignee.user_id);
                const names = await Promise.all(userIds.map(async userId => {
                    const userResponse = await axios.get(`${process.env.REACT_APP_API}/users/${userId}`);
                    return userResponse.data.username;
                }));
                setAssignees(names);
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Task-Zuweisen:', error);
        }
    }

    useEffect(() => {
        fetchAssignees();
    }, [task.task_id, trackChanges]);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteTask(task.task_id);
        setTrack(false);
        setDeleteDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <TableRow className="taskTableRow" onClick={handleOpenTaskDetailDialog} disabled={true}>
                <TableCell component="th" scope="row">
                    {tasks.find(t => t.id === task.task_id)?.name || 'Unknown Task'}
                </TableCell>
                <TableCell>
                    {getStatusString(tasks.find(t => t.id === task.task_id)?.status_id)}
                </TableCell>
                <TableCell>
                    {assignees.length > 0 ? assignees.join(', ') : 'Unassigned'}
                </TableCell>
                <TableCell>
                    <Button onClick={handleDeleteClick} variant="contained" color="error">Delete</Button>
                </TableCell>
            </TableRow>
            <TaskDetailDialog 
                open={isTaskDetailDialogOpen}
                handleClose={() => { handleCloseTaskDetailDialog(); setTrack(true); }}
                projectUsers={projectUsers}
                taskId={task.task_id}
            />
            <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this task?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TaskTableRow;
