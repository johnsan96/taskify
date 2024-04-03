import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useUsers } from '../hooks/useApi';

function TaskDetailDialog({ taskId, open, handleClose, projectUsers }) {
  const [task, setTask] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [statusId, setStatusId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const apiUrl = process.env.REACT_APP_API;

  useEffect(() => {
    if (open && taskId) {
      fetchTask(taskId);
      fetchAvailableUsers();
    }
  }, [open, taskId]);

  const fetchAvailableUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`, {withCredentials: true});
      const assignedUsersResponse = await axios.get(`${apiUrl}/taskAssignees?task_id=${taskId}`);

      const assignedUserIds = assignedUsersResponse.data.map(taskAssignee => taskAssignee.user_id);

      const projectUserIds = projectUsers.map(projectUser => projectUser.user_id);

      const availableUsers = response.data.filter(user => projectUserIds.includes(user.id) && !assignedUserIds.includes(user.id));

      setAvailableUsers(availableUsers);
    } catch (error) {
      console.error('Error fetching available users:', error);
    }
  };

  const fetchTask = async (taskId) => {
    try {
      const response = await axios.get(`${apiUrl}/tasks/${taskId}`);
      setTask(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setStatusId(response.data.status_id);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      await axios.put(`${apiUrl}/tasks/${taskId}`, {
        name,
        description,
        status_id: statusId
      });

      if (assigneeId) {
        console.log("taskassignee " + assigneeId)
        await axios.post(`${apiUrl}/taskAssignees`, {
          task_id: taskId,
          user_id: assigneeId
        });
      }

      setAssigneeId('');

      handleClose();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Fehler beim Aktualisieren des Tasks. Bitte versuchen Sie es später erneut.');
      setAssigneeId('');
    }
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${apiUrl}/tasks/${taskId}`);
      handleClose();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Fehler beim Löschen des Tasks. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusId}
              onChange={(e) => setStatusId(e.target.value)}
            >
              <MenuItem value={1}>Todo</MenuItem>
              <MenuItem value={2}>In Progress</MenuItem>
              <MenuItem value={3}>Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Assignee</InputLabel>
            <Select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
            >
              {availableUsers.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogOpen} color="error">Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateTask} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteTask} color="error">Yes</Button>
          <Button onClick={handleDeleteDialogClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskDetailDialog;
