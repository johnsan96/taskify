

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';


function ProjectCreationDialog({ open, handleClose, setTrackChanges }) {

    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');

    const handleCreateProject = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API}/projects`, {
                name: newProjectName,
                description: newProjectDescription
            });
            setTrackChanges(true);
            handleClose();
         
        } catch (error) {
            console.error('Fehler beim Erstellen des Projekts:', error);

        }
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="projectName"
                    label="Project Name"
                    type="text"
                    fullWidth
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="projectDescription"
                    label="Project Description"
                    type="text"
                    fullWidth
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreateProject} color="primary">Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProjectCreationDialog;
