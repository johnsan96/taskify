import React, { useState, useEffect } from 'react';
import { TableRow, TableCell } from '@mui/material';
import TaskDetailDialog from './TaskDetailDialog';
import axios from 'axios';

function TaskTableRow({ task, tasks }) {
    const [isTaskDetailDialogOpen, setTaskDetailDialogOpen] = useState(false);
    const [assignees, setAssignees] = useState([]);

    const handleOpenTaskDetailDialog = () => {
        setTaskDetailDialogOpen(true);
    };

    const handleCloseTaskDetailDialog = () => {
        setTaskDetailDialogOpen(false);
    };

    // Funktion zum Übersetzen des Statuswerts in den entsprechenden String
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

  
    useEffect(() => {
        async function fetchAssignees() {
            try {
                const response = await axios.get(`http://localhost:4000/taskAssignees?task_id=${task.task_id}`);
                const assigneesData = response.data;
                if (assigneesData.length > 0) {
                    // Extrahiere die Benutzer-IDs aus den Zuweisungsdaten
                    const userIds = assigneesData.map(assignee => assignee.user_id);
                    // Für jede Benutzer-ID die Benutzerdaten abrufen und die Namen speichern
                    const names = await Promise.all(userIds.map(async userId => {
                        const userResponse = await axios.get(`http://localhost:4000/users/${userId}`);
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
                    {assignees.length > 0 ? assignees.join(', ') : 'Unassigned'} {/* Zeigt die zugewiesenen Benutzer oder "Unassigned" an */}
                </TableCell>
            </TableRow>
            <TaskDetailDialog open={isTaskDetailDialogOpen} handleClose={handleCloseTaskDetailDialog} taskId={task.task_id} />
        </>
    );
}

export default TaskTableRow;
