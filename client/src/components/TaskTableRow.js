import React, { useState, useEffect } from 'react';
import { TableRow, TableCell } from '@mui/material';
import TaskDetailDialog from './TaskDetailDialog';
import axios from 'axios';

function TaskTableRow({ task, tasks, setTrack }) {
    const [isTaskDetailDialogOpen, setTaskDetailDialogOpen] = useState(false);
    const [assignees, setAssignees] = useState([]);

    const handleOpenTaskDetailDialog = () => {
        setTaskDetailDialogOpen(true);
    };

    const handleCloseTaskDetailDialog = () => {
        setTaskDetailDialogOpen(false);
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



    useEffect(() => {
        async function fetchAssignees() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/taskAssignees?task_id=${task.task_id}`);
                const assigneesData = response.data;
                if (assigneesData.length > 0) {
                    // Extrahiere die Benutzer-IDs aus den Zuweisungsdaten
                    const userIds = assigneesData.map(assignee => assignee.user_id);
                    // Für jede Benutzer-ID die Benutzerdaten abrufen und die Namen speichern
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

        fetchAssignees();
    }, [task.task_id]);

    return (
        <>
            <TableRow className="taskTableRow" onClick={handleOpenTaskDetailDialog}>
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
                    <button onClick={(e) => { e.stopPropagation(); deleteTask(task.task_id); }}>Delete</button>
                </TableCell>
            </TableRow>
            <TaskDetailDialog open={isTaskDetailDialogOpen}
                handleClose={() => { handleCloseTaskDetailDialog(); setTrack(true); }}
                taskId={task.task_id}
            />
        </>
    );
}

export default TaskTableRow;
