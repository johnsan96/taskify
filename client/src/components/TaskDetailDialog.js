import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function TaskDetailDialog({ taskId, open, handleClose }) {
  const [task, setTask] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [statusId, setStatusId] = useState('');

  useEffect(() => {
    if (open && taskId) {
      fetchTask(taskId);
    }
  }, [open, taskId]);

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
      handleClose();
    } catch (error) {
      console.error('Error updating task:', error);
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
        {/* Assuming you have a select component for status */}
        <TextField
          label="Status"
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdateTask} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDetailDialog;
