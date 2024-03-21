import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));

function TaskCreationDialog({ open, handleClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = async () => {
    try {
      // Sende Anfrage zum Erstellen des Tasks an die API
      await axios.post('http://localhost:4000/tasks', { name, description });
      // Schließe den Dialog
      handleClose();
    } catch (error) {
      console.error('Fehler beim Erstellen des Tasks:', error);
      // Behandlung von Fehlern hier...
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Task</DialogTitle>
      <CustomDialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </CustomDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleCreateTask} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskCreationDialog;
