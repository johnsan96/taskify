import { useState, useEffect } from 'react';
import { getProjects, getProjectUsers, getProjectTasks, getUsers, getTasks } from '../lib/api';


export function useUsers({  role = '', test }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers({ role, test })
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    }, [role]);

    return users;
}

export function useProjects(trackChanges) {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        getProjects()
            .then(data => setProjects(data))
            .catch(error => console.error(error));
    }, [trackChanges]);

    return projects;
}


export function useProjectUsers({trackChanges}) {
    const [projectUsers, setProjectUsers] = useState([]);

    useEffect(() => {
        getProjectUsers()
            .then(data => setProjectUsers(data))
            .catch(error => console.error(error));
    }, [trackChanges]);

    return projectUsers;
}


export function useProjectTasks({isTaskDialogOpen, trackChanges}) {
    const [projectTasks, setProjectTasks] = useState([]);

    useEffect(() => {
        getProjectTasks()
            .then(data => setProjectTasks(data))
            .catch(error => console.error(error));
    }, [isTaskDialogOpen, trackChanges]);

    return projectTasks;
}

export function useTasks({isTaskDialogOpen,trackChanges}) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks()
            .then(data => setTasks(data))
            .catch(error => console.error(error));
    }, [isTaskDialogOpen, trackChanges]);

    return tasks;
}
