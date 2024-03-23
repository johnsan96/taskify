import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useUsers } from '../hooks/useApi';

function TaskDetailDialog({ taskId, open, handleClose }) {
  const [task, setTask] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [statusId, setStatusId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    if (open && taskId) {
      fetchTask(taskId);
      fetchAvailableUsers();
    }
  }, [open, taskId]);

  const fetchAvailableUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users`);
      const assignedUsersResponse = await axios.get(`http://localhost:4000/taskAssignees?task_id=${taskId}`);
      const assignedUserIds = assignedUsersResponse.data.map(taskAssignee => taskAssignee.user_id);
      setAvailableUsers(response.data.filter(user => !assignedUserIds.includes(user.id)));
    } catch (error) {
      console.error('Error fetching available users:', error);
    }
  };

  const fetchTask = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:4000/tasks/${taskId}`);
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
      await axios.put(`http://localhost:4000/tasks/${taskId}`, {
        name,
        description,
        status_id: statusId
      });

      if (assigneeId) {
        console.log("taskassignee "+assigneeId)
        await axios.post('http://localhost:4000/taskAssignees', {
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

  return (
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

        <TextField
          label="Status"
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
          fullWidth
        />
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdateTask} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDetailDialog;
